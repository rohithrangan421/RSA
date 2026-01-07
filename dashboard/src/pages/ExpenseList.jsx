import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExpenseList() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resource/Expense Claim?fields=[\"name\",\"status\",\"posting_date\"]", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FFF7EF" }}>
      {/* HEADER */}
      <AppBar position="static" sx={{ bgcolor: "#FF9F43", boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            Expenses
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/dashboard/create-expense")}
            sx={{
              bgcolor: "#fff",
              color: "#FF9F43",
              fontWeight: 600,
              "&:hover": { bgcolor: "#FFE1C2" },
            }}
          >
            Add
          </Button>
        </Toolbar>
      </AppBar>

      {/* CONTENT */}
      <Box px={2} py={2}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && expenses.length === 0 && (
          <Typography textAlign="center" color="text.secondary">
            No expenses found
          </Typography>
        )}

        {expenses.map((exp) => (
          <Card
            key={exp.name}
            sx={{
              mb: 2,
              borderRadius: 3,
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Typography fontWeight={700} fontSize={14}>
                {exp.name}
              </Typography>

              <Typography fontSize={13} color="text.secondary" mt={0.5}>
                Status: <b>{exp.status}</b>
              </Typography>

              <Typography fontSize={13} color="text.secondary">
                Date: {exp.posting_date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
