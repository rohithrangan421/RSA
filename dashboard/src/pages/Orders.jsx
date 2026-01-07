import {
  Box,
  Typography,
  IconButton,
  TextField,
  Card,
  Grid,
  Chip,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

  const orders = [
    {
      id: "SAL-ORD-2025-0071",
      customer: "KRISHNA STORES PALAKKAL",
      date: "2025-06-23",
      createdAt: "Created 08:17 am · Modified 08:17 am",
      amount: 2057.21,
      status: "Delivery Bill",
    },
    {
      id: "SAL-ORD-2025-0067",
      customer: "ZAYAN",
      date: "2025-06-23",
      createdAt: "Created 10:01 am · Modified 10:01 am",
      amount: 216.01,
      status: "Delivery Bill",
    },
    {
      id: "SAL-ORD-2025-0065",
      customer: "ZAYAN",
      date: "2025-06-23",
      createdAt: "Created 10:52 am · Modified 10:52 am",
      amount: 0.0,
      status: "Delivery Bill",
    },
  ];

  return (
    <Box sx={{ width: 375, mx: "auto", bgcolor: "#F6F6F6", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <Box
        sx={{
          bgcolor: "#FFC107",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton size="small" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          Orders
        </Typography>
      </Box>

      {/* SEARCH & FILTER */}
      <Box sx={{ px: 2, py: 2, display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by id or Name"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />

        <IconButton
          sx={{
            bgcolor: "#FFC107",
            borderRadius: 2,
            width: 48,
          }}
        >
          <TuneIcon />
        </IconButton>
      </Box>

      {/* ORDER LIST */}
      <Box px={2} pb={2}>
        {orders.map((order) => (
          <Card
            key={order.id}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              boxShadow: "none",
            }}
          >
            {/* ORDER ID & DATE */}
            <Grid container justifyContent="space-between">
              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                ₹ {order.id}
              </Typography>
              <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                {order.date}
              </Typography>
            </Grid>

            {/* CUSTOMER */}
            <Typography sx={{ fontSize: 12, mt: 0.5 }}>
              {order.customer}
            </Typography>

            {/* STATUS */}
            <Chip
              label={`✔ ${order.status}`}
              size="small"
              sx={{
                mt: 1,
                bgcolor: "#FFE082",
                color: "#000",
                fontSize: 11,
              }}
            />

            {/* CREATED / MODIFIED */}
            <Typography
              sx={{
                fontSize: 10,
                color: "text.secondary",
                mt: 1,
              }}
            >
              {order.createdAt}
            </Typography>

            {/* TOTAL */}
            <Grid container justifyContent="space-between" mt={1}>
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                Grand Total
              </Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                ₹{order.amount.toFixed(2)}
              </Typography>
            </Grid>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
