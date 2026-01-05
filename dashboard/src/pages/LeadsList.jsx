// import { useEffect, useState } from "react";
// import "../assets/leads.css";

// export default function LeadsList() {
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const fetchLeads = () => {
//     fetch("/api/method/route_sales.api.lead.view_all_leads", {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setLeads(data.message?.data || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   };

//   const deleteLead = async (leadId) => {
//     if (!window.confirm("Delete this lead?")) return;

//     try {
//       const res = await fetch(
//         "/api/method/route_sales.api.lead.delete_lead",
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ lead_id: leadId }),
//         }
//       );

//       const data = await res.json();

//       if (data.message?.status === "success") {
//         setLeads((prev) => prev.filter((l) => l.name !== leadId));
//       } else {
//         alert("Failed to delete");
//       }
//     } catch {
//       alert("Server error ❌");
//     }
//   };

//   if (loading) return <div className="leads-page">Loading...</div>;

//   return (
//     <div className="leads-page">
//       {/* HEADER */}
//       <div className="leads-header">
//         <h3>Leads</h3>
//         <button
//           className="btn-add"
//           onClick={() =>
//             (window.location.href = "/dashboard/create-lead")
//           }
//         >
//           + Add
//         </button>
//       </div>

//       {leads.length === 0 && (
//         <p className="empty-text">No leads found</p>
//       )}

//       {/* LIST */}
//       <div className="leads-list">
//         {leads.map((lead) => (
//           <div key={lead.name} className="lead-card">
//             <div className="lead-row">
//               <div>
//                 <div className="lead-name">{lead.lead_name}</div>
//                 <div className="lead-info">{lead.phone}</div>
//                 <div className="lead-info">{lead.email_id}</div>
//               </div>

//               <button
//                 className="delete-btn"
//                 onClick={() => deleteLead(lead.name)}
//               >
//                 🗑️
//               </button>
//             </div>

//             <span className="lead-status">
//               {lead.status || "Lead"}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

export default function LeadsList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    fetch("/api/method/route_sales.api.lead.view_all_leads", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.message?.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const deleteLead = async (leadId) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      const res = await fetch(
        "/api/method/route_sales.api.lead.delete_lead",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lead_id: leadId }),
        }
      );

      const data = await res.json();

      if (data.message?.status === "success") {
        setLeads((prev) => prev.filter((l) => l.name !== leadId));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Server error ❌");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FFF6ED",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#FFF6ED",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          bgcolor: "#FF9F43",
          color: "#fff",
          px: 2,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Leads</Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#fff",
            color: "#FF9F43",
            fontWeight: 600,
            borderRadius: 2,
            "&:hover": { bgcolor: "#fff" },
          }}
          onClick={() =>
            (window.location.href = "/dashboard/create-lead")
          }
        >
          Add
        </Button>
      </Box>

      {/* EMPTY STATE */}
      {leads.length === 0 && (
        <Typography
          align="center"
          sx={{ mt: 6, color: "#777" }}
        >
          No leads found
        </Typography>
      )}

      {/* LIST */}
      <Box sx={{ p: 2 }}>
        <Stack spacing={2}>
          {leads.map((lead) => (
            <Card
              key={lead.name}
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography fontWeight={600}>
                    {lead.lead_name}
                  </Typography>

                  <Typography
                    fontSize={13}
                    color="text.secondary"
                  >
                    {lead.phone}
                  </Typography>

                  <Typography
                    fontSize={13}
                    color="text.secondary"
                  >
                    {lead.email_id}
                  </Typography>
                </Box>

                <IconButton
                  onClick={() => deleteLead(lead.name)}
                  sx={{
                    color: "#ff6b6b",
                    border: "1px solid #ffe1e1",
                    borderRadius: 2,
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>

              <Box sx={{ mt: 1 }}>
                <Chip
                  label={lead.status || "Lead"}
                  size="small"
                  sx={{
                    bgcolor: "#FFE8CC",
                    color: "#FF9F43",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
