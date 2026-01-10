import frappe

@frappe.whitelist()
def get_sales_returns():
    returns = frappe.get_all(
        "Sales Invoice",
        filters={"is_return": 1, "docstatus": 1},
        fields=[
            "name",
            "customer",
            "posting_date",
            "grand_total"
        ]
    )
    return returns

@frappe.whitelist()
def create_sales_return(invoice_name, items):
    items = frappe.parse_json(items)
    original_invoice = frappe.get_doc("Sales Invoice", invoice_name)

    if original_invoice.is_return:
        frappe.throw("Already a return invoice")

    return_invoice = frappe.copy_doc(original_invoice)
    return_invoice.is_return = 1
    return_invoice.return_against = original_invoice.name

    return_invoice.items = []

    for item in items:
        return_invoice.append("items", {
            "item_code": item["item_code"],
            "qty": -abs(item["qty"]),
            "rate": item["rate"]
        })

    return_invoice.insert(ignore_permissions=True)
    return_invoice.submit()

    return {
        "return_invoice": return_invoice.name,
        "status": "Sales Return Created"
    }

@frappe.whitelist()
def get_return_details(return_invoice):
    return frappe.get_doc("Sales Invoice", return_invoice)
