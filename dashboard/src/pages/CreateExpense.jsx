// import React, { useState } from "react";
// import "../assets/create-expense.css";

// export default function CreateExpense() {
//   const [employee, setEmployee] = useState("");
//   const [expenseType, setExpenseType] = useState("");
//   const [amount, setAmount] = useState("");
//   const [date, setDate] = useState("");
//   const [notes, setNotes] = useState("");

//   const [msg, setMsg] = useState("");
//   const [msgColor, setMsgColor] = useState("#333");

//   const submitExpense = async () => {
//   setMsg("Submitting expense...");
//   setMsgColor("#333");

//   if (!employee || !expenseType || !amount) {
//     setMsg("Employee, Expense Type and Amount are required");
//     setMsgColor("red");
//     return;
//   }

//   try {
//     const formData = new FormData();
//     formData.append("employee", employee);
//     formData.append("expense_type", expenseType);
//     formData.append("amount", amount);
//     formData.append("date", date);
//     formData.append("notes", notes);

//     const res = await fetch(
//       "/api/method/route_sales.api.expense.create_expense",
//       {
//         method: "POST",
//         credentials: "include",
//         body: formData, // 🔥 IMPORTANT
//       }
//     );

//     const data = await res.json();

//     if (data.message?.status === "success") {
//       setMsg("Expense submitted successfully ✅");
//       setMsgColor("green");

//       setExpenseType("");
//       setAmount("");
//       setDate("");
//       setNotes("");
//     } else {
//       setMsg(data.message || "Failed ❌");
//       setMsgColor("red");
//     }
//   } catch (err) {
//     console.error(err);
//     setMsg("Server error ❌");
//     setMsgColor("red");
//   }
// };

//   return (
//     <div className="expense-page">
//       <div className="expense-header">
//         <span className="back-arrow">←</span>
//         <h3>Create Expense</h3>
//       </div>

//       <div className="expense-card">
//         <div className="input-group">
//           <label>Employee *</label>
//           <input
//             placeholder="EMP-0001"
//             value={employee}
//             onChange={(e) => setEmployee(e.target.value)}
//           />
//         </div>

//         <div className="input-group">
//           <label>Expense Type *</label>
//           <input
//             placeholder="Travel / Food / Fuel"
//             value={expenseType}
//             onChange={(e) => setExpenseType(e.target.value)}
//           />
//         </div>

//         <div className="input-group">
//           <label>Amount *</label>
//           <input
//             type="number"
//             placeholder="0.00"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>

//         <div className="input-group">
//           <label>Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>

//         <div className="input-group">
//           <label>Notes</label>
//           <input
//             placeholder="Optional description"
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//           />
//         </div>

//         <button className="btn-primary" onClick={submitExpense}>
//           Submit Expense
//         </button>

//         {msg && (
//           <div className="msg" style={{ color: msgColor }}>
//             {msg}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


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

    navigate("/dashboard");
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
