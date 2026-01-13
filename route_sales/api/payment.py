import frappe
from frappe import _
from frappe.utils import nowdate, flt

@frappe.whitelist()
def get_payments(sales_person=None, from_date=None, to_date=None):
    """Get payment entries for sales person"""
    filters = {"docstatus": 1}
    
    if sales_person:
        filters["sales_person"] = sales_person
    if from_date:
        filters["posting_date"] = [">=", from_date]
    if to_date:
        filters["posting_date"] = ["<=", to_date]
    
    payments = frappe.get_all("Payment Entry",
        filters=filters,
        fields=["name", "party", "party_name", "paid_amount", "posting_date", 
                "mode_of_payment", "reference_no", "status"],
        order_by="posting_date desc"
    )
    
    return payments

@frappe.whitelist()
def get_customer_outstanding(customer):
    """Get outstanding invoices for a customer"""
    invoices = frappe.db.sql("""
        SELECT name, posting_date, grand_total, outstanding_amount
        FROM `tabSales Invoice`
        WHERE customer = %s AND docstatus = 1 AND outstanding_amount > 0
        ORDER BY posting_date ASC
    """, customer, as_dict=True)
    
    total_outstanding = sum(inv.outstanding_amount for inv in invoices)
    
    return {
        "invoices": invoices,
        "total_outstanding": total_outstanding
    }

@frappe.whitelist()
def create_payment(customer, amount, mode_of_payment, reference_no=None, 
                   allocated_invoices=None, sales_person=None):
    """Create payment entry with auto/manual allocation"""
    company = frappe.defaults.get_user_default("Company")
    
    payment = frappe.get_doc({
        "doctype": "Payment Entry",
        "payment_type": "Receive",
        "party_type": "Customer",
        "party": customer,
        "paid_amount": flt(amount),
        "received_amount": flt(amount),
        "mode_of_payment": mode_of_payment,
        "reference_no": reference_no,
        "reference_date": nowdate(),
        "posting_date": nowdate(),
        "company": company,
        "sales_person": sales_person
    })
    
    # Auto-allocate to oldest invoices if not specified
    if not allocated_invoices:
        outstanding = get_customer_outstanding(customer)
        remaining = flt(amount)
        allocated_invoices = []
        
        for inv in outstanding["invoices"]:
            if remaining <= 0:
                break
            alloc = min(remaining, inv.outstanding_amount)
            allocated_invoices.append({
                "invoice": inv.name,
                "amount": alloc
            })
            remaining -= alloc
    
    # Add references
    for alloc in allocated_invoices:
        payment.append("references", {
            "reference_doctype": "Sales Invoice",
            "reference_name": alloc["invoice"],
            "allocated_amount": alloc["amount"]
        })
    
    payment.insert()
    payment.submit()
    
    return {"success": True, "payment_id": payment.name}
