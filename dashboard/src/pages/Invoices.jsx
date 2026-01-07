// src/pages/Invoices.jsx
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Fab,
  Stack
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

import InvoiceCard from "../components/InvoiceCard";

function Invoices() {
      const navigate = useNavigate();
  const invoices = [
    {
      id: "SNV-25-00009",
      customer: "2 KAE AAR SUPER MART - PAZHANJI",
      status: "overdue",
      amount: 74.14,
      date: "2025-04-29",
    },
    {
      id: "SNV-25-00007",
      customer: "3 S V TRADERS - NORTH PARAVUR",
      status: "paid",
      amount: 0.0,
      date: "2025-04-20",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#faf7ff" }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "#f6b800" }}>
        <Toolbar>
          <Typography variant="h6">Invoices</Typography>
        </Toolbar>
      </AppBar>

      {/* Search & Filter */}
      <Stack direction="row" spacing={1} sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search invoices by ID or Name"
        />
        <IconButton
          sx={{
            bgcolor: "#f6b800",
            color: "#000",
            "&:hover": { bgcolor: "#e5a900" },
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Stack>

      {/* Invoice List */}
      <Box sx={{ px: 2 }}>
        {invoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
          />
        ))}
      </Box>

      {/* Floating Add Button */}
      <Fab

        onClick={() => navigate("/select-customer")}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#f6b800",
          color: "#000",
          "&:hover": { bgcolor: "#e5a900" },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
} 
export default Invoices;
   