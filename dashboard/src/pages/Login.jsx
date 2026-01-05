import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "/api/method/route_sales.api.login.login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            usr: email,
            pwd: password,
          }),
        }
      );

      const data = await res.json();

      if (data.message?.status === "success") {
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#FFF6ED",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 360,
          p: 3,
          borderRadius: 4,
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        }}
      >
        {/* LOGO / TITLE */}
        <Box textAlign="center" mb={3}>
          <Typography
            sx={{
              fontSize: 26,
              fontWeight: 800,
              color: "#FF9F43",
              letterSpacing: 0.5,
            }}
          >
            Route Sales
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#777",
              mt: 0.5,
            }}
          >
            Login to continue
          </Typography>
        </Box>

        {/* USERNAME */}
        <TextField
          fullWidth
          label="Username / Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2.5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* PASSWORD */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* ERROR MESSAGE */}
        {error && (
          <Typography
            sx={{
              color: "error.main",
              fontSize: 12,
              mb: 1,
              textAlign: "center",
            }}
          >
            {error}
          </Typography>
        )}

        {/* LOGIN BUTTON */}
        <Button
          fullWidth
          disabled={loading}
          onClick={handleLogin}
          sx={{
            mt: 1,
            py: 1.3,
            fontWeight: 700,
            borderRadius: 2,
            bgcolor: "#FF9F43",
            color: "#fff",
            "&:hover": {
              bgcolor: "#FF8C1A",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : (
            "LOGIN"
          )}
        </Button>
      </Card>
    </Box>
  );
}
