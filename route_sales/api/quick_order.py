import frappe
from frappe.utils import nowdate 
# @frappe.whitelist()
# def create_quick_order(customer, items):
import json
#     items = json.loads(items)

#     so = frappe.get_doc({
#         "doctype": "Sales Order",
#         "customer": customer,
#         "delivery_date": frappe.utils.nowdate(),
#         "items": items
#     })
#     so.insert()
#     return so.name


@frappe.whitelist()
def create_quick_order(customer, items):
    items = frappe.parse_json(items)

    if not items:
        frappe.throw("Items required")

    so = frappe.new_doc("Sales Order")
    so.customer = customer
    so.transaction_date = nowdate()
    so.delivery_date = nowdate()
    so.company = frappe.defaults.get_global_default("company")

    for item in items:
        so.append("items", {
            "item_code": item["item_code"],
            "qty": item["qty"],
            "rate": item.get("rate", 0)
        })

    so.insert(ignore_permissions=True)
    so.submit()

    return {
        "sales_order": so.name,
        "status": "Created"
    }
