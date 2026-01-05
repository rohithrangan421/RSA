import frappe
from frappe.utils import validate_email_address
from erpnext.crm.doctype.lead.lead import make_customer
import uuid

# ======================================================
# CREATE LEAD
# ======================================================
@frappe.whitelist(allow_guest=True)
def create_lead():
    # Accept BOTH JSON and form data
    data = frappe.request.get_json(silent=True) or frappe.local.form_dict

    first_name = data.get("first_name")
    company_name = data.get("organization_name")
    email = data.get("email")
    phone = data.get("phone")
    customer_group = data.get("customer_group")
    territory = data.get("territory")

    if not first_name or not company_name:
        frappe.throw("First Name and Organization Name are required")

    if email:
        validate_email_address(email, throw=True)

    lead_name = None
    if email:
        lead_name = frappe.db.get_value("Lead", {"email_id": email}, "name")

    if lead_name:
        # UPDATE EXISTING LEAD (NO 409)
        lead = frappe.get_doc("Lead", lead_name)
        action = "updated"
    else:
        # CREATE NEW LEAD
        lead = frappe.new_doc("Lead")
        lead.lead_name = f"{first_name}-{uuid.uuid4().hex[:8]}"
        action = "created"

    lead.first_name = first_name
    lead.company_name = company_name
    lead.email_id = email
    lead.phone = phone

    # Safe customer group
    if customer_group and frappe.db.exists("Customer Group", customer_group):
        lead.customer_group = customer_group
    else:
        lead.customer_group = None

    # Safe territory
    if territory and frappe.db.exists("Territory", territory):
        lead.territory = territory
    else:
        lead.territory = "India"

    lead.save(ignore_permissions=True)
    frappe.db.commit()

    return {
        "status": "success",
        "action": action,
        "lead_id": lead.name
    }
# ======================================================
# CONVERT LEAD TO CUSTOMER
# ======================================================
@frappe.whitelist()
def convert_lead_to_customer(lead_id):
    if not lead_id:
        frappe.throw("Lead ID is required")

    if not frappe.db.exists("Lead", lead_id):
        frappe.throw("Lead not found")

    lead = frappe.get_doc("Lead", lead_id)

    if lead.status == "Converted":
        frappe.throw("Lead already converted")

    customer = make_customer(lead_id)
    customer.insert(ignore_permissions=True)

    frappe.db.commit()

    return {
        "status": "success",
        "customer_id": customer.name
    }


# ======================================================
# UPDATE LEAD
# ======================================================
@frappe.whitelist()
def update_lead(lead_id):
    data = frappe.local.form_dict

    if not frappe.db.exists("Lead", lead_id):
        frappe.throw("Lead not found")

    lead = frappe.get_doc("Lead", lead_id)

    allowed_fields = {
        "lead_name": "lead_name",
        "company_name": "company_name",
        "phone": "phone",
        "email": "email_id",
        "territory": "territory",
        "customer_group": "customer_group",
        "status": "status",
    }

    for key, field in allowed_fields.items():
        if data.get(key) is not None:
            lead.set(field, data.get(key))

    lead.save(ignore_permissions=True)
    frappe.db.commit()

    return {
        "status": "success",
        "lead_id": lead.name
    }


# ======================================================
# GET LEADS
# ======================================================
@frappe.whitelist()
def get_leads(limit=20, offset=0):
    leads = frappe.get_all(
        "Lead",
        fields=[
            "name",
            "lead_name",
            "company_name",
            "phone",
            "email_id",
            "territory",
            "customer_group",
            "status",
            "creation"
        ],
        order_by="creation desc",
        limit_start=int(offset),
        limit_page_length=int(limit)
    )

    return {
        "status": "success",
        "data": leads
    }


# ======================================================
# DELETE LEAD
# ======================================================
@frappe.whitelist()
def delete_lead(lead_id):
    if not lead_id:
        frappe.throw("Lead ID is required")

    if not frappe.db.exists("Lead", lead_id):
        frappe.throw("Lead not found")

    frappe.delete_doc("Lead", lead_id, ignore_permissions=True)
    frappe.db.commit()

    return {
        "status": "success",
        "message": "Lead deleted successfully"
    }


# ======================================================
# VIEW ALL LEADS
# ======================================================
@frappe.whitelist()
def view_all_leads():
    leads = frappe.get_all(
        "Lead",
        fields=[
            "name",
            "lead_name",
            "company_name",
            "email_id",
            "phone",
            "status",
            "territory",
            "creation"
        ],
        order_by="creation desc",
        ignore_permissions=True
    )

    return {
        "status": "success",
        "data": leads
    }
