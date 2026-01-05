import { getCSRFToken } from "./csrf";

export async function createLead(formData) {
  const res = await fetch(
    "http://localhost:8014/api/method/route_sales.api.lead.create_lead",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        first_name: formData.first_name,
        organization_name: formData.organization_name,
        phone: formData.phone,
        email: formData.email,
        territory: formData.territory,
      }),
    }
  );

  return res.json();
}
