import {
  Box,
  Typography,
  IconButton,
  TextField,
  Card,
  Grid,
  Collapse,
  Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import MapIcon from "@mui/icons-material/Map";

import { useState } from "react";

export default function RouteSales() {
  const [openId, setOpenId] = useState(null);

  const customers = [
    "KRISHNA STORES PALAKKAL",
    "KAE AAR SUPER MART - PAZHANJI",
    "SV TRADERS - NORTH PARAVUR",
    "U CHICKEN CENTER",
    "U STORES - THRISSUR",
  ];

  const toggle = (index) => {
    setOpenId(openId === index ? null : index);
  };

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
        <IconButton size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography fontSize={18} fontWeight={600}>
          Route Sales
        </Typography>
      </Box>

      {/* SEARCH + FILTER */}
      <Box sx={{ px: 2, py: 2, display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by name"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />

        <IconButton
          sx={{
            bgcolor: "#FFC107",
            borderRadius: 2,
            width: 46,
          }}
        >
          <TuneIcon />
        </IconButton>
      </Box>

      {/* CUSTOMER LIST */}
      <Box px={2}>
        {customers.map((name, index) => (
          <Card
            key={index}
            sx={{
              mb: 1.5,
              p: 1.5,
              borderRadius: 3,
              boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            {/* TITLE ROW */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => toggle(index)}
              sx={{ cursor: "pointer" }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "#E53935",
                    borderRadius: "50%",
                  }}
                />
                <Typography fontSize={13} fontWeight={600}>
                  {index + 1}. {name}
                </Typography>
              </Box>

              <ExpandMoreIcon
                sx={{
                  transform: openId === index ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.3s",
                }}
              />
            </Box>

            {/* ACTION BUTTONS */}
            <Collapse in={openId === index}>
              <Grid container spacing={1.5} mt={1}>
                <Grid item xs={3}>
                  <Action icon={<ShoppingCartIcon />} label="Order" />
                </Grid>
                <Grid item xs={3}>
                  <Action icon={<ReceiptLongIcon />} label="Invoice" />
                </Grid>
                <Grid item xs={3}>
                  <Action icon={<PaymentsIcon />} label="Payment" />
                </Grid>
                <Grid item xs={3}>
                  <Action icon={<MapIcon />} label="Map" />
                </Grid>
              </Grid>
            </Collapse>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

/* Reusable action button */
function Action({ icon, label }) {
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{
        height: 56,
        borderRadius: 2,
        textTransform: "none",
        flexDirection: "column",
        fontSize: 11,
        borderColor: "#E0E0E0",
        color: "#000",
      }}
    >
      {icon}
      {label}
    </Button>
  );
}
