# import frappe
# from frappe import _

# @frappe.whitelist(allow_guest=True)
# def login(usr, pwd):
#     try:
#         # Authenticate user
#         frappe.local.login_manager.authenticate(usr, pwd)

#         # Create session
#         frappe.local.login_manager.post_login()

#         return {
#             "status": "success",
#             "message": "Logged In",
#             "user": frappe.session.user
#         }

#     except frappe.exceptions.AuthenticationError:
#         frappe.clear_messages()
#         frappe.throw(_("Invalid username or password"), frappe.AuthenticationError)


import frappe
from frappe import _
from frappe.auth import LoginManager


@frappe.whitelist(allow_guest=True)
def login(usr, pwd):
    try:
        # IMPORTANT: Disable CSRF for API login
        frappe.flags.ignore_csrf = True

        # Create login manager
        login_manager = LoginManager()

        # Authenticate user
        login_manager.authenticate(user=usr, pwd=pwd)

        # Create session
        login_manager.post_login()

        return {
            "status": "success",
            "message": "Logged in successfully",
            "user": frappe.session.user
        }

    except frappe.exceptions.AuthenticationError:
        frappe.clear_messages()
        return {
            "status": "failed",
            "message": "Invalid username or password"
        }

