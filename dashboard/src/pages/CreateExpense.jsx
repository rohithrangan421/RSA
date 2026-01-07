
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateExpense() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employee: "",
    expenseType: "",
    amount: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const clearForm = () =>
    setForm({
      employee: "",
      expenseType: "",
      amount: "",
      date: "",
      notes: "",
    });

  const submitExpense = async () => {
    if (!form.employee || !form.expenseType || !form.amount) {
      alert("Employee, Expense Type and Amount are required");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));

    await fetch("/api/method/route_sales.api.expense.create_expense", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    navigate("/dashboard/expenses");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FFF7EF" }}>
      {/* HEADER */}
      <AppBar position="static" sx={{ bgcolor: "#FF9F43", boxShadow: "none" }}>
        <Toolbar>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>
            Create Expense
          </Typography>
        </Toolbar>
      </AppBar>

      {/* CONTENT */}
      <Box px={2} mt={2}>
        <Card
          sx={{
            borderRadius: 3,
            p: 2.5,
            boxShadow: "0 8px 25px hsla(0, 75.00%, 1.60%, 0.23)",
          }}
        >
          {/* EMPLOYEE */}
          <Typography fontSize={13} fontWeight={600} mb={0.5}>
            Employee *
          </Typography>FFF7EF
          <TextField
            fullWidth
            name="employee"
            placeholder="EMP-0001"
            value={form.employee}
            onChange={handleChange}
            size="small"
            sx={{ mb: 2 }}
          />

          {/* EXPENSE TYPE */}
          <Typography fontSize={13} fontWeight={600} mb={0.5}>
            Expense Type *
          </Typography>
          <TextField
            fullWidth
            name="expenseType"
            placeholder="Travel / Food / Fuel"
            value={form.expenseType}
            onChange={handleChange}
            size="small"
            sx={{ mb: 2 }}
          />

          {/* AMOUNT */}
          <Typography fontSize={13} fontWeight={600} mb={0.5}>
            Amount *
          </Typography>
          <TextField
            fullWidth
            type="number"
            name="amount"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
            size="small"
            sx={{ mb: 2 }}
          />

          {/* DATE */}
          <Typography fontSize={13} fontWeight={600} mb={0.5}>
            Date
          </Typography>
          <TextField
            fullWidth
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            size="small"
            sx={{ mb: 2 }}
          />

          {/* NOTES */}
          <Typography fontSize={13} fontWeight={600} mb={0.5}>
            Notes
          </Typography>
          <TextField
            fullWidth
            name="notes"
            placeholder="Optional description"
            value={form.notes}
            onChange={handleChange}
            size="small"
            sx={{ mb: 3 }}
          />

          {/* BUTTONS */}
          <Button
            fullWidth
            onClick={submitExpense}
            sx={{
              bgcolor: "#FF9F43",
              color: "#fff",
              fontWeight: 700,
              py: 1.2,
              borderRadius: 2,
              mb: 1.5,
              "&:hover": { bgcolor: "#FF8C1A" },
            }}
          >
            Submit Expense
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={clearForm}
            sx={{
              borderColor: "#FF9F43",
              color: "#FF9F43",
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Clear Form
          </Button>
        </Card>
      </Box>
    </Box>
  );
}
