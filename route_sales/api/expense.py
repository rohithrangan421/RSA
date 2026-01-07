import frappe

@frappe.whitelist()
def create_expense(employee, expense_approver, company, expenses):
    expenses = frappe.parse_json(expenses)

    if not employee:
        frappe.throw("Employee is required")

    if not expense_approver:
        frappe.throw("Expense Approver is required")

    if not company:
        frappe.throw("Company is required")

    ec = frappe.new_doc("Expense Claim")
    ec.employee = employee
    ec.expense_approver = expense_approver
    ec.company = company

    for row in expenses:
        if not row.get("expense_claim_type"):
            frappe.throw("Expense Type missing")

        ec.append("expenses", {
            "expense_date": row.get("expense_date"),
            "expense_type": row.get("expense_claim_type"),
            "amount": row.get("amount"),
            "description": row.get("description")
        })

    ec.insert(ignore_permissions=True)
    frappe.db.commit()

    return {
        "status": "success",
        "expense_claim": ec.name
    }
