import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Card,
  Grid,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

export default function Customers() {
  const customers = [
    {
      id: 1,
      name: "KRISHNA STORES PALAKKAL",
      address: "Palakkal, Thrissur",
      sales: 12500,
      payment: 8000,
    },
    {
      id: 2,
      name: "KAE AAR SUPER MART - PAZHANJI",
      address: "Pazhanji, Thrissur",
      sales: 9500,
      payment: 7200,
    },
    {
      id: 3,
      name: "SV TRADERS - NORTH PARAVUR",
      address: "North Paravur",
      sales: 18000,
      payment: 15000,
    },
  
  ];

  return (
    <Box
      sx={{
        width: 375,
        mx: "auto",
        bgcolor: "#F6F6F6",
        minHeight: "100vh",
      }}
    >
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
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          Customers
        </Typography>
      </Box>

      {/* SEARCH & FILTER */}
      <Box sx={{ px: 2, py: 2, display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search customer"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
          }}
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

      {/* CUSTOMER LIST */}
      <Box px={2} pb={2}>
        {customers.map((cust) => (
          <Card
            key={cust.id}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              boxShadow: "none",
            }}
          >
            {/* NAME */}
            <Typography
              sx={{ fontSize: 14, fontWeight: 700 }}
            >
              {cust.name}
            </Typography>

            {/* ADDRESS */}
            <Typography
              sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}
            >
              {cust.address}
            </Typography>

            {/* SALES INFO */}
            <Grid container spacing={1} mt={1}>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 11 }}>
                  Total Sales ₹
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  {cust.sales}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ fontSize: 11 }}>
                  Total Payment ₹
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  {cust.payment}
                </Typography>
              </Grid>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid container spacing={1} mt={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    borderColor: "#FFC107",
                    color: "#000",
                  }}
                >
                  Payment
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    bgcolor: "#FFC107",
                    color: "#000",
                    "&:hover": {
                      bgcolor: "#FFB300",
                    },
                  }}
                >
                  Quick Order
                </Button>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
