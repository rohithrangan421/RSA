// import Header from "../components/Header";
// import StatCard from "../components/StatCard";
// import MenuCard from "../components/MenuCard";
// import "../styles/dashboard.css";

// function Dashboard() {
//   return (
//     <div className="dashboard">

//       {/* ORANGE BACKGROUND WRAPPER */}
//       <div className="top-section">
//         <Header userName="Renil" />

//         <div className="stats">
//           <StatCard title="Visited" value="21" />
//           <StatCard title="Orders" value="21" />
//           <StatCard title="Check-In" value="5" />
//         </div>
//       </div>

//       {/* MENU */}
//       <div className="menu-grid">
//         <MenuCard title="Sales" />
//         <MenuCard title="Payment" />
//         <MenuCard title="Leads" />
//         <MenuCard title="Invoice" />
//         <MenuCard title="Orders" />
//         <MenuCard title="Routes" />
//         <MenuCard title="Return" />
//         <MenuCard title="Expenses" />
//       </div>

//     </div>
//   );
// }

// export default Dashboard;
import { useNavigate } from "react-router-dom";
import salesImg from "../assets/sales.svg";
import paymentImg from "../assets/payment.svg";
import leadsImg from "../assets/leads.svg";
import invoiceImg from "../assets/invoice.svg";
import ordersImg from "../assets/orders.svg";
import routesImg from "../assets/routes.svg";
import returnImg from "../assets/return.svg";
import expensesImg from "../assets/expenses.svg";

import {
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function Dashboard() {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        width: 375,
        mx: "auto",
        bgcolor: "#F6F6F6",
        minHeight: "80vh",
      }}
    >
      {/* ORANGE HEADER + STATS */}
      <Box
        sx={{
          bgcolor: "#FF9A2E",
          borderBottomLeftRadius:15,
          borderBottomRightRadius:15,
          // borderTopLeftRadius: 28,
          // borderTopRightRadius: 28,
          px: 2,
          pt: 2,
          pb: 3,
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{ color: "#fff", fontSize: 14, opacity: 0.9 }}
            >
              Good Afternoon
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: 20, fontWeight: 700 }}
            >
              Renil
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.35)",
              width: 36,
              height: 36,
            }}
          >
            <PersonOutlineIcon />
          </Avatar>
        </Box>

        {/* STAT CARDS */}
        <Grid container spacing={1.2} mt={2}>
          {/* Visited */}
          <Grid item xs={4}>
            <Card
              sx={{
                height: 90,
                width:90,
                marginLeft:2,
                bgcolor: "#DFF6FB",
                borderRadius: 3,
                boxShadow: "none",
                p: 1,
              }}
            >
              <Typography
                sx={{ fontSize: 12, color: "#0077B6" }}
              >
                Visited
              </Typography>
              <Typography
                sx={{ fontSize: 18, fontWeight: 700, color: "#0077B6" }}
              >
                21
              </Typography>
            </Card>
          </Grid>

          {/* Orders */}
          <Grid item xs={4}>
            <Card
              sx={{
                height: 90,
                width:90,
                marginLeft:1,
                bgcolor: "#FFE9D6",
                borderRadius: 3,
                boxShadow: "none",
                p: 1,
              }}
            >
              <Typography
                sx={{ fontSize: 12, color: "#FF7A00" }}
              >
                Orders
              </Typography>
              <Typography
                sx={{ fontSize: 18, fontWeight: 700, color: "#FF7A00" }}
              >
                21
              </Typography>
            </Card>
          </Grid>

          {/* Check-In */}
          <Grid item xs={4}>
            <Card
              sx={{
                height: 90,
                width:90,
                marginLeft:1,
                bgcolor: "#FFF1CC",
                borderRadius: 3,
                boxShadow: "none",
                p: 1,
              }}
            >
              <Typography
                sx={{ fontSize: 12, color: "#FF9F1C" }}
              >
                Check-In
              </Typography>
              <Typography
                sx={{ fontSize: 18, fontWeight: 700, color: "#FF9F1C" }}
              >
                5
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* MENU GRID */}
<Grid container spacing={1.5} px={2} mt={2}>
  {[
    ["Sales", "#FFE9D6", "#FF6B00", salesImg],
    ["Payment", "#DCEBFF", "#2F6FED", paymentImg],
    ["Leads", "#FFE1E8", "#FF4D6D", leadsImg],
    ["Invoice", "#F0E6FF", "#7B2CBF", invoiceImg],
    ["Orders", "#FFF1CC", "#FF9F1C", ordersImg],
    ["Routes", "#DFFFE6", "#2E7D32", routesImg],
    ["Return", "#FFDCC5", "#EF6C00", returnImg],
    ["Expenses", "#FFF2C6", "#F9A825", expensesImg],
  ].map(([title, bg, color, img]) => (
   <Grid item xs={6} key={title}>
  <Card
    onClick={() => {
      if (title === "Sales") {
        navigate("/customers");
      } else if (title === "Orders") {
        navigate("/orders");
      }
    }}
    sx={{
      height: 120,
      width: 165,
      bgcolor: bg,
      borderRadius: 4,
      boxShadow: "none",
      p: 1.5,
      position: "relative",
      cursor:
        title === "Sales" || title === "Orders"
          ? "pointer"
          : "default",
    }}
  >
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 600,
        color,
      }}
    >
      {title}
    </Typography>

    <Box
      component="img"
      src={img}
      alt={title}
      sx={{
        width: 55,
        position: "absolute",
        right: 10,
        bottom: 10,
      }}
    />
  </Card>
</Grid>

  ))}
</Grid>

    </Box>
  );
}
