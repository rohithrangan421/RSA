import frappe
@frappe.whitelist()
def create_invoice_from_order(sales_order):
    so = frappe.get_doc("Sales Order", sales_order)

    if so.status != "To Deliver and Bill":
        frappe.throw("Sales Order already billed")

    si = frappe.new_doc("Sales Invoice")
    si.customer = so.customer
    si.company = so.company
    si.sales_order = so.name

    for item in so.items:
        si.append("items", {
            "item_code": item.item_code,
            "qty": item.qty,
            "rate": item.rate,
            "sales_order": so.name
        })

    si.insert(ignore_permissions=True)
    si.submit()

    return {
        "invoice": si.name,
        "status": "Invoice Generated"
    }

@frappe.whitelist()
def get_customer_invoices(customer):
    invoices = frappe.get_all(
        "Sales Invoice",
        filters={"customer": customer, "docstatus": 1},
        fields=[
            "name",
            "posting_date",
            "grand_total",
            "outstanding_amount"
        ]
    )
    return invoices
