import frappe
from frappe import _
from frappe.utils import nowdate, flt, cint

@frappe.whitelist()
def get_products(customer=None, category=None, search=None, price_list=None):
    """Get products for quick order with customer-specific pricing"""
    conditions = "i.disabled = 0 AND i.is_sales_item = 1"
    values = {}
    
    if category:
        conditions += " AND i.item_group = %(category)s"
        values["category"] = category
    
    if search:
        conditions += " AND (i.item_code LIKE %(search)s OR i.item_name LIKE %(search)s)"
        values["search"] = f"%{search}%"
    
    # Get customer's price list
    if customer and not price_list:
        price_list = frappe.db.get_value("Customer", customer, "default_price_list")
    if not price_list:
        price_list = frappe.db.get_single_value("Selling Settings", "selling_price_list")
    
    products = frappe.db.sql(f"""
        SELECT 
            i.name as item_code,
            i.item_name,
            i.item_group as category,
            i.stock_uom as uom,
            i.image,
            i.description,
            COALESCE(ip.price_list_rate, 0) as price,
            COALESCE(b.actual_qty, 0) as stock_qty
        FROM `tabItem` i
        LEFT JOIN `tabItem Price` ip ON ip.item_code = i.name 
            AND ip.price_list = %(price_list)s
            AND (ip.valid_from IS NULL OR ip.valid_from <= %(today)s)
            AND (ip.valid_upto IS NULL OR ip.valid_upto >= %(today)s)
        LEFT JOIN `tabBin` b ON b.item_code = i.name
        WHERE {conditions}
        GROUP BY i.name
        ORDER BY i.item_name
    """, {"price_list": price_list, "today": nowdate(), **values}, as_dict=True)
    
    return products

@frappe.whitelist()
def get_product_categories():
    """Get all product categories/item groups"""
    categories = frappe.get_all("Item Group",
        filters={"is_group": 0, "show_in_website": 1},
        fields=["name", "parent_item_group", "image"],
        order_by="name"
    )
    return categories

@frappe.whitelist()
def get_product_detail(item_code, customer=None):
    """Get detailed product info with stock and pricing"""
    item = frappe.get_doc("Item", item_code)
    
    # Get price
    price_list = None
    if customer:
        price_list = frappe.db.get_value("Customer", customer, "default_price_list")
    if not price_list:
        price_list = frappe.db.get_single_value("Selling Settings", "selling_price_list")
    
    price = frappe.db.get_value("Item Price", 
        {"item_code": item_code, "price_list": price_list}, "price_list_rate") or 0
    
    # Get stock
    stock = frappe.db.sql("""
        SELECT warehouse, actual_qty 
        FROM `tabBin` 
        WHERE item_code = %s AND actual_qty > 0
    """, item_code, as_dict=True)
    
    return {
        "item_code": item.name,
        "item_name": item.item_name,
        "category": item.item_group,
        "uom": item.stock_uom,
        "image": item.image,
        "description": item.description,
        "price": price,
        "stock": stock,
        "total_stock": sum(s.actual_qty for s in stock)
    }

@frappe.whitelist()
def validate_cart(customer, items):
    """Validate cart items - check stock, prices, credit limit"""
    import json
    if isinstance(items, str):
        items = json.loads(items)
    
    errors = []
    warnings = []
    validated_items = []
    
    # Get customer credit info
    credit_limit = frappe.db.get_value("Customer", customer, "credit_limit") or 0
    outstanding = get_customer_outstanding_amount(customer)
    
    # Get price list
    price_list = frappe.db.get_value("Customer", customer, "default_price_list")
    if not price_list:
        price_list = frappe.db.get_single_value("Selling Settings", "selling_price_list")
    
    cart_total = 0
    
    for item in items:
        item_code = item.get("item_code")
        qty = flt(item.get("qty", 1))
        
        # Check if item exists and is active
        item_doc = frappe.db.get_value("Item", item_code, 
            ["item_name", "stock_uom", "disabled", "is_sales_item"], as_dict=True)
        
        if not item_doc:
            errors.append(f"Item {item_code} not found")
            continue
        
        if item_doc.disabled:
            errors.append(f"Item {item_code} is disabled")
            continue
        
        # Get current price
        price = frappe.db.get_value("Item Price",
            {"item_code": item_code, "price_list": price_list}, "price_list_rate") or 0
        
        # Check stock
        stock_qty = frappe.db.sql("""
            SELECT COALESCE(SUM(actual_qty), 0) 
            FROM `tabBin` WHERE item_code = %s
        """, item_code)[0][0]
        
        if stock_qty < qty:
            warnings.append(f"{item_code}: Only {stock_qty} available, requested {qty}")
        
        line_total = price * qty
        cart_total += line_total
        
        validated_items.append({
            "item_code": item_code,
            "item_name": item_doc.item_name,
            "qty": qty,
            "uom": item_doc.stock_uom,
            "rate": price,
            "amount": line_total,
            "stock_qty": stock_qty
        })
    
    # Check credit limit
    if credit_limit > 0 and (outstanding + cart_total) > credit_limit:
        available_credit = max(0, credit_limit - outstanding)
        warnings.append(f"Credit limit exceeded. Available: {available_credit}")
    
    return {
        "valid": len(errors) == 0,
        "errors": errors,
        "warnings": warnings,
        "items": validated_items,
        "cart_total": cart_total,
        "outstanding": outstanding,
        "credit_limit": credit_limit
    }

@frappe.whitelist()
def create_quick_order(customer, items, delivery_date=None, notes=None, sales_person=None):
    """Create sales order from quick order cart"""
    import json
    if isinstance(items, str):
        items = json.loads(items)
    
    # Validate first
    validation = validate_cart(customer, items)
    if not validation["valid"]:
        return {"success": False, "errors": validation["errors"]}
    
    company = frappe.defaults.get_user_default("Company")
    
    # Get sales person from employee if not provided
    if not sales_person:
        employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
        sales_person = frappe.db.get_value("Sales Person", {"employee": employee}, "name")
    
    # Create Sales Order
    order = frappe.get_doc({
        "doctype": "Sales Order",
        "customer": customer,
        "company": company,
        "transaction_date": nowdate(),
        "delivery_date": delivery_date or nowdate(),
        "sales_person": sales_person,
        "notes": notes,
        "order_type": "Sales"
    })
    
    for item in validation["items"]:
        order.append("items", {
            "item_code": item["item_code"],
            "item_name": item["item_name"],
            "qty": item["qty"],
            "rate": item["rate"],
            "uom": item["uom"],
            "delivery_date": delivery_date or nowdate()
        })
    
    order.insert()
    order.submit()
    
    return {
        "success": True,
        "order_id": order.name,
        "grand_total": order.grand_total,
        "message": _("Order created successfully")
    }

@frappe.whitelist()
def create_quick_invoice(customer, items, sales_person=None, create_delivery=False):
    """Create sales invoice directly (for cash sales)"""
    import json
    if isinstance(items, str):
        items = json.loads(items)
    
    validation = validate_cart(customer, items)
    if not validation["valid"]:
        return {"success": False, "errors": validation["errors"]}
    
    company = frappe.defaults.get_user_default("Company")
    
    if not sales_person:
        employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
        sales_person = frappe.db.get_value("Sales Person", {"employee": employee}, "name")
    
    # Create Sales Invoice
    invoice = frappe.get_doc({
        "doctype": "Sales Invoice",
        "customer": customer,
        "company": company,
        "posting_date": nowdate(),
        "due_date": nowdate(),
        "sales_person": sales_person,
        "update_stock": 1 if create_delivery else 0  # Auto deduct stock
    })
    
    for item in validation["items"]:
        invoice.append("items", {
            "item_code": item["item_code"],
            "item_name": item["item_name"],
            "qty": item["qty"],
            "rate": item["rate"],
            "uom": item["uom"]
        })
    
    invoice.insert()
    invoice.submit()
    
    return {
        "success": True,
        "invoice_id": invoice.name,
        "grand_total": invoice.grand_total,
        "message": _("Invoice created successfully")
    }

def get_customer_outstanding_amount(customer):
    """Helper: Get total outstanding for customer"""
    return frappe.db.sql("""
        SELECT COALESCE(SUM(outstanding_amount), 0)
        FROM `tabSales Invoice`
        WHERE customer = %s AND docstatus = 1
    """, customer)[0][0]

@frappe.whitelist()
def get_recent_orders(customer, limit=5):
    """Get customer's recent orders for reorder"""
    orders = frappe.db.sql("""
        SELECT so.name, so.transaction_date, so.grand_total,
               GROUP_CONCAT(soi.item_code) as items
        FROM `tabSales Order` so
        JOIN `tabSales Order Item` soi ON soi.parent = so.name
        WHERE so.customer = %s AND so.docstatus = 1
        GROUP BY so.name
        ORDER BY so.transaction_date DESC
        LIMIT %s
    """, (customer, limit), as_dict=True)
    
    return orders

@frappe.whitelist()
def reorder_from_previous(order_id, customer):
    """Create new order from previous order items"""
    items = frappe.get_all("Sales Order Item",
        filters={"parent": order_id},
        fields=["item_code", "qty"]
    )
    
    return validate_cart(customer, items)
