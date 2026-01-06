import React from "react";
import { Box, Typography, Grid, Card, Button, Avatar } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StatCard from "../components/StatCard"; // Assuming your StatCard component is in the components folder
import MenuCard from "../components/MenuCard"; // Assuming your MenuCard component is in the components folder

function CustomerList() {
  // Sample customer data
  const customers = [
    { id: 1, name: "KRISHNA STORES", totalSales: 10000, totalPayment: 5000 },
    { id: 2, name: "KAE AAR SUPER MART", totalSales: 15000, totalPayment: 7000 },
    { id: 3, name: "S V TRADERS", totalSales: 12000, totalPayment: 6000 },
    { id: 4, name: "U CHICKEN CENTER", totalSales: 18000, totalPayment: 8000 },
    { id: 5, name: "4U STORES", totalSales: 9000, totalPayment: 4000 },
  ];

  return (
    <Box sx={{ width: 375, mx: "auto", bgcolor: "#F6F6F6", minHeight: "80vh" }}>
      {/* HEADER */}
      <Box
        sx={{
          bgcolor: "#FF9A2E",
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          px: 2,
          pt: 2,
          pb: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: 14 }}>Good Afternoon</Typography>
            <Typography sx={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>Renil</Typography>
          </Box>
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.35)", width: 36, height: 36 }}>
            <PersonOutlineIcon />
          </Avatar>
        </Box>
      </Box>

      {/* STATS */}
      <Grid container spacing={2} mt={2} px={2}>
        <Grid item xs={4}>
          <StatCard title="Total Sales" value="55,000" bgColor="#FFE9D6" textColor="#FF6B00" />
        </Grid>
        <Grid item xs={4}>
          <StatCard title="Total Payments" value="25,000" bgColor="#DCEBFF" textColor="#2F6FED" />
        </Grid>
        <Grid item xs={4}>
          <StatCard title="Active Customers" value="5" bgColor="#FFF1CC" textColor="#FF9F1C" />
        </Grid>
      </Grid>

      {/* CUSTOMER LIST */}
      <Grid container spacing={2} mt={2} px={2}>
        {customers.map((customer) => (
          <Grid item xs={12} key={customer.id}>
            <Card sx={{ bgcolor: "#FFF", p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6">{customer.name}</Typography>
              <Typography sx={{ color: "#888" }}>Total Sales: {customer.totalSales}</Typography>
              <Typography sx={{ color: "#888" }}>Total Payment: {customer.totalPayment}</Typography>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="primary">
                  Payment
                </Button>
                <Button variant="outlined" color="secondary">
                  Quick View
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* MENU OPTIONS */}
      <Grid container spacing={1.5} px={2} mt={2}>
        {[
          ["Add Customer", "#DFFFE6", "#2E7D32", "add.svg"],
          ["View Details", "#FFDCC5", "#EF6C00", "view.svg"],
          ["Filter", "#FFF2C6", "#F9A825", "filter.svg"],
        ].map(([title, bg, color, img]) => (
          <Grid item xs={6} key={title}>
            <MenuCard title={title} bgColor={bg} color={color} img={img} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CustomerList;
