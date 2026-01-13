import frappe
from frappe import _
from frappe.utils import nowdate, flt

@frappe.whitelist()
def get_returns(customer=None, sales_person=None, from_date=None, to_date=None):
    """Get sales returns list"""
    filters = {"docstatus": 1, "is_return": 1}
    
    if customer:
        filters["customer"] = customer
    if sales_person:
        filters["sales_person"] = sales_person
    
    returns = frappe.get_all("Sales Invoice",
        filters=filters,
        fields=["name", "customer", "customer_name", "posting_date", 
                "grand_total", "return_against"],
        order_by="posting_date desc"
    )
    
    return returns

@frappe.whitelist()
def create_return(invoice_id, items, reason=None):
    """Create sales return against invoice"""
    original = frappe.get_doc("Sales Invoice", invoice_id)
    
    return_doc = frappe.get_doc({
        "doctype": "Sales Invoice",
        "customer": original.customer,
        "is_return": 1,
        "return_against": invoice_id,
        "posting_date": nowdate(),
        "company": original.company,
        "sales_person": original.sales_person
    })
    
    for item in items:
        orig_item = next((i for i in original.items if i.item_code == item["item_code"]), None)
        if orig_item:
            return_doc.append("items", {
                "item_code": item["item_code"],
                "item_name": orig_item.item_name,
                "qty": -abs(item["qty"]),  # Negative qty for return
                "rate": orig_item.rate,
                "warehouse": orig_item.warehouse
            })
    
    return_doc.insert()
    return_doc.submit()
    
    return {"success": True, "return_id": return_doc.name}


@frappe.whitelist()
def get_return_details(return_invoice):
    return frappe.get_doc("Sales Invoice", return_invoice)
