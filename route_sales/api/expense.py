import frappe
from frappe.utils import today

@frappe.whitelist(allow_guest=False)
def create_expense():
    frappe.flags.ignore_csrf = True 

    data = frappe.local.form_dict

    employee = data.get("employee")
    expense_type = data.get("expense_type")
    amount = data.get("amount")
    date = data.get("date")
    notes = data.get("notes")

    if not employee or not expense_type or not amount:
        frappe.throw("Employee, Expense Type and Amount are required")

    expense = frappe.new_doc("Expense Claim")
    expense.employee = employee
    expense.append("expenses", {
        "expense_type": expense_type,
        "amount": amount,
        "posting_date": date,
        "description": notes
    })

    expense.insert(ignore_permissions=True)
    frappe.db.commit()

    return {
        "status": "success",
        "expense_id": expense.name
    }