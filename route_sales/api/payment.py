import frappe
@frappe.whitelist()
def create_customer_payment(customer, amount, mode_of_payment):
    pe = frappe.new_doc("Payment Entry")
    pe.payment_type = "Receive"
    pe.party_type = "Customer"
    pe.party = customer
    pe.paid_amount = amount
    pe.received_amount = amount
    pe.mode_of_payment = mode_of_payment
    pe.company = frappe.defaults.get_global_default("company")

    pe.insert(ignore_permissions=True)
    pe.submit()

    return {
        "payment_entry": pe.name,
        "status": "Payment Received"
    }
