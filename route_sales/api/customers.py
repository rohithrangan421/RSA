import frappe
from frappe import _
from frappe.utils import nowdate

@frappe.whitelist()
def get_customers(sales_person=None, territory=None, customer_group=None, search=None):
    """Get customers list with filters"""
    conditions = "c.disabled = 0"
    values = {}
    
    if sales_person:
        conditions += " AND c.sales_person = %(sales_person)s"
        values["sales_person"] = sales_person
    
    if territory:
        conditions += " AND c.territory = %(territory)s"
        values["territory"] = territory
    
    if customer_group:
        conditions += " AND c.customer_group = %(customer_group)s"
        values["customer_group"] = customer_group
    
    if search:
        conditions += """ AND (c.customer_name LIKE %(search)s 
                         OR c.mobile_no LIKE %(search)s 
                         OR c.name LIKE %(search)s)"""
        values["search"] = f"%{search}%"
    
    customers = frappe.db.sql(f"""
        SELECT 
            c.name as customer_id,
            c.customer_name,
            c.mobile_no,
            c.email_id,
            c.customer_group,
            c.territory,
            c.credit_limit,
            addr.address_line1,
            addr.city,
            COALESCE(outstanding.amount, 0) as outstanding_amount
        FROM `tabCustomer` c
        LEFT JOIN `tabDynamic Link` dl ON dl.link_name = c.name AND dl.link_doctype = 'Customer'
        LEFT JOIN `tabAddress` addr ON addr.name = dl.parent AND addr.is_primary_address = 1
        LEFT JOIN (
            SELECT customer, SUM(outstanding_amount) as amount
            FROM `tabSales Invoice` WHERE docstatus = 1
            GROUP BY customer
        ) outstanding ON outstanding.customer = c.name
        WHERE {conditions}
        ORDER BY c.customer_name
    """, values, as_dict=True)
    
    return customers

@frappe.whitelist()
def get_customer_detail(customer):
    """Get full customer details"""
    cust = frappe.get_doc("Customer", customer)
    
    # Get addresses
    addresses = frappe.db.sql("""
        SELECT addr.*
        FROM `tabAddress` addr
        JOIN `tabDynamic Link` dl ON dl.parent = addr.name
        WHERE dl.link_name = %s AND dl.link_doctype = 'Customer'
    """, customer, as_dict=True)
    
    # Get contacts
    contacts = frappe.db.sql("""
        SELECT con.*
        FROM `tabContact` con
        JOIN `tabDynamic Link` dl ON dl.parent = con.name
        WHERE dl.link_name = %s AND dl.link_doctype = 'Customer'
    """, customer, as_dict=True)
    
    # Get credit info
    outstanding = frappe.db.sql("""
        SELECT COALESCE(SUM(outstanding_amount), 0) as outstanding
        FROM `tabSales Invoice`
        WHERE customer = %s AND docstatus = 1
    """, customer)[0][0]
    
    return {
        "customer_id": cust.name,
        "customer_name": cust.customer_name,
        "customer_group": cust.customer_group,
        "territory": cust.territory,
        "mobile_no": cust.mobile_no,
        "email_id": cust.email_id,
        "credit_limit": cust.credit_limit,
        "outstanding_amount": outstanding,
        "available_credit": max(0, (cust.credit_limit or 0) - outstanding),
        "addresses": addresses,
        "contacts": contacts
    }

@frappe.whitelist()
def get_customer_ledger(customer, from_date=None, to_date=None):
    """Get customer transaction history"""
    if not from_date:
        from_date = frappe.utils.add_months(nowdate(), -3)
    if not to_date:
        to_date = nowdate()
    
    # Get invoices
    invoices = frappe.db.sql("""
        SELECT 'Invoice' as type, name as ref, posting_date as date,
               grand_total as debit, 0 as credit, outstanding_amount
        FROM `tabSales Invoice`
        WHERE customer = %s AND posting_date BETWEEN %s AND %s AND docstatus = 1
    """, (customer, from_date, to_date), as_dict=True)
    
    # Get payments
    payments = frappe.db.sql("""
        SELECT 'Payment' as type, name as ref, posting_date as date,
               0 as debit, paid_amount as credit, 0 as outstanding_amount
        FROM `tabPayment Entry`
        WHERE party = %s AND party_type = 'Customer' 
              AND posting_date BETWEEN %s AND %s AND docstatus = 1
    """, (customer, from_date, to_date), as_dict=True)
    
    # Combine and sort
    ledger = sorted(invoices + payments, key=lambda x: x["date"])
    
    # Calculate running balance
    balance = 0
    for entry in ledger:
        balance += entry["debit"] - entry["credit"]
        entry["balance"] = balance
    
    return ledger

@frappe.whitelist()
def create_customer(customer_name, mobile_no, email_id=None, customer_group=None,
                    territory=None, address=None, sales_person=None):
    """Create new customer"""
    customer = frappe.get_doc({
        "doctype": "Customer",
        "customer_name": customer_name,
        "customer_type": "Company",
        "customer_group": customer_group or "All Customer Groups",
        "territory": territory or "All Territories",
        "mobile_no": mobile_no,
        "email_id": email_id,
        "sales_person": sales_person
    })
    customer.insert()
    
    # Create address if provided
    if address:
        addr = frappe.get_doc({
            "doctype": "Address",
            "address_title": customer_name,
            "address_type": "Billing",
            "address_line1": address.get("line1"),
            "city": address.get("city"),
            "state": address.get("state"),
            "pincode": address.get("pincode"),
            "country": address.get("country", "India"),
            "is_primary_address": 1
        })
        addr.append("links", {
            "link_doctype": "Customer",
            "link_name": customer.name
        })
        addr.insert()
    
    return {"success": True, "customer_id": customer.name}
