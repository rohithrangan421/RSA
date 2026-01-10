export async function getCustomers({ territory, route, search, start = 0, limit = 50 }) {
    const params = new URLSearchParams({ territory, route, search, limit, start });
    const res = await fetch(`/api/method/route_sales_app.api.sales.get_customers?${params.toString()}`, {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to load customers');
    return res.json().then(d => d.message || []);
  }
  