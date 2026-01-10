export async function getRouteCustomers(route) {
    const res = await fetch(`/api/method/route_sales_app.api.sales.get_route_customers?route=${encodeURIComponent(route)}`, {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to load route customers');
    return res.json().then(d => d.message || []);
  }
  