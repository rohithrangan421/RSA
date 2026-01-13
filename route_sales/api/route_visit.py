import frappe
from frappe import _
from frappe.utils import nowdate, now, flt

@frappe.whitelist()
def get_route_customers(route=None, sales_person=None, visit_date=None):
    """Get customers in route with visit status"""
    if not visit_date:
        visit_date = nowdate()
    
    if not sales_person:
        employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
        sales_person = frappe.db.get_value("Sales Person", {"employee": employee}, "name")
    
    # Get customers with their visit status for today
    customers = frappe.db.sql("""
        SELECT 
            c.name as customer_id,
            c.customer_name,
            c.mobile_no,
            c.customer_group,
            c.territory,
            addr.address_line1,
            addr.city,
            addr.pincode,
            addr.latitude,
            addr.longitude,
            rv.name as visit_id,
            rv.status as visit_status,
            rv.check_in_time,
            rv.check_out_time,
            COALESCE(outstanding.amount, 0) as outstanding_amount,
            last_order.last_order_date,
            last_order.last_order_amount
        FROM `tabCustomer` c
        LEFT JOIN `tabDynamic Link` dl ON dl.link_name = c.name AND dl.link_doctype = 'Customer'
        LEFT JOIN `tabAddress` addr ON addr.name = dl.parent
        LEFT JOIN `tabRoute Visit` rv ON rv.customer = c.name 
            AND rv.visit_date = %(visit_date)s 
            AND rv.sales_person = %(sales_person)s
        LEFT JOIN (
            SELECT customer, SUM(outstanding_amount) as amount
            FROM `tabSales Invoice`
            WHERE docstatus = 1
            GROUP BY customer
        ) outstanding ON outstanding.customer = c.name
        LEFT JOIN (
            SELECT customer, 
                   MAX(transaction_date) as last_order_date,
                   (SELECT grand_total FROM `tabSales Order` 
                    WHERE customer = so.customer 
                    ORDER BY transaction_date DESC LIMIT 1) as last_order_amount
            FROM `tabSales Order` so
            WHERE docstatus = 1
            GROUP BY customer
        ) last_order ON last_order.customer = c.name
        WHERE c.sales_person = %(sales_person)s
        ORDER BY rv.sequence_no, c.customer_name
    """, {"sales_person": sales_person, "visit_date": visit_date}, as_dict=True)
    
    return customers

@frappe.whitelist()
def start_visit(customer, latitude=None, longitude=None):
    """Start a customer visit (check-in)"""
    employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
    sales_person = frappe.db.get_value("Sales Person", {"employee": employee}, "name")
    
    # Check if visit already exists
    existing = frappe.db.get_value("Route Visit", {
        "customer": customer,
        "visit_date": nowdate(),
        "sales_person": sales_person
    }, "name")
    
    if existing:
        visit = frappe.get_doc("Route Visit", existing)
        visit.status = "In Progress"
        visit.check_in_time = now()
        visit.check_in_latitude = latitude
        visit.check_in_longitude = longitude
        visit.save()
    else:
        visit = frappe.get_doc({
            "doctype": "Route Visit",
            "customer": customer,
            "visit_date": nowdate(),
            "sales_person": sales_person,
            "status": "In Progress",
            "check_in_time": now(),
            "check_in_latitude": latitude,
            "check_in_longitude": longitude
        })
        visit.insert()
    
    return {"success": True, "visit_id": visit.name}

@frappe.whitelist()
def end_visit(visit_id, latitude=None, longitude=None, notes=None, no_order_reason=None):
    """End a customer visit (check-out)"""
    visit = frappe.get_doc("Route Visit", visit_id)
    visit.status = "Completed"
    visit.check_out_time = now()
    visit.check_out_latitude = latitude
    visit.check_out_longitude = longitude
    visit.notes = notes
    visit.no_order_reason = no_order_reason
    visit.save()
    
    return {"success": True, "message": _("Visit completed")}

@frappe.whitelist()
def skip_visit(customer, reason):
    """Mark customer as skipped for today"""
    employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
    sales_person = frappe.db.get_value("Sales Person", {"employee": employee}, "name")
    
    visit = frappe.get_doc({
        "doctype": "Route Visit",
        "customer": customer,
        "visit_date": nowdate(),
        "sales_person": sales_person,
        "status": "Skipped",
        "no_order_reason": reason
    })
    visit.insert()
    
    return {"success": True, "visit_id": visit.name}

@frappe.whitelist()
def get_visit_summary(sales_person=None, visit_date=None):
    """Get visit summary for the day"""
    if not visit_date:
        visit_date = nowdate()
    
    if not sales_person:
        employee = frappe.db.get_value("Employee", {"user_id": frappe.session.user}, "name")
        sales_person = frappe.db.get_value("Sales Person", {"employee": employee}, "name")
    
    summary = frappe.db.sql("""
        SELECT 
            COUNT(*) as total_customers,
            SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as visited,
            SUM(CASE WHEN status = 'Skipped' THEN 1 ELSE 0 END) as skipped,
            SUM(CASE WHEN status = 'Pending' OR status IS NULL THEN 1 ELSE 0 END) as pending
        FROM (
            SELECT c.name, rv.status
            FROM `tabCustomer` c
            LEFT JOIN `tabRoute Visit` rv ON rv.customer = c.name 
                AND rv.visit_date = %(visit_date)s
            WHERE c.sales_person = %(sales_person)s
        ) visits
    """, {"sales_person": sales_person, "visit_date": visit_date}, as_dict=True)[0]
    
    # Get orders and collections for today
    orders = frappe.db.sql("""
        SELECT COUNT(*) as count, COALESCE(SUM(grand_total), 0) as total
        FROM `tabSales Order`
        WHERE sales_person = %s AND transaction_date = %s AND docstatus = 1
    """, (sales_person, visit_date), as_dict=True)[0]

    collections = frappe.db.sql("""
        SELECT COUNT(*) as count, COALESCE(SUM(paid_amount), 0) as total
        FROM `tabPayment Entry`
        WHERE sales_person = %s AND posting_date = %s AND docstatus = 1
    """, (sales_person, visit_date), as_dict=True)[0]
    
    return {
        **summary,
        "orders_count": orders.count,
        "orders_total": orders.total,
        "collections_count": collections.count,
        "collections_total": collections.total
    }
