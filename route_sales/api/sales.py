import frappe

@frappe.whitelist()
def get_customers(territory=None, route=None, search=None, limit_start=0, limit_page_length=50):
    filters = {}
    if territory:
        filters["territory"] = territory
    if search:
        # basic search on name and customer_name
        customers = frappe.db.sql("""
            SELECT name, customer_name, mobile_no, territory
            FROM `tabCustomer`
            WHERE (name LIKE %(q)s OR customer_name LIKE %(q)s)
            {territory_clause}
            ORDER BY customer_name ASC
            LIMIT %(start)s, %(limit)s
        """.format(
            territory_clause="AND territory=%(territory)s" if territory else ""
        ), {
            "q": f"%{search}%",
            "territory": territory,
            "start": int(limit_start),
            "limit": int(limit_page_length)
        }, as_dict=True)
        return customers

    return frappe.get_all(
        "Customer",
        filters=filters,
        fields=["name", "customer_name", "mobile_no", "territory"],
        start=limit_start,
        page_length=limit_page_length,
        order_by="customer_name asc"
    )



@frappe.whitelist()
def get_route_customers(route):
    if not route:
        frappe.throw("Route is required")
    return frappe.get_all(
        "Route Customer",
        filters={"parent": route},
        fields=["customer", "sequence", "latitude", "longitude"],
        order_by="sequence asc"
    )
