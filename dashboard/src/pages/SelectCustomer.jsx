import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Card,
  Stack,
  Avatar
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import SortIcon from "@mui/icons-material/Sort";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function SelectCustomer() {
  const navigate = useNavigate();

  const customers = [
    { id: 1, name: "A K TRADERS" },
    { id: 2, name: "AAFIYA MUJEEB" },
    { id: 3, name: "abcd" },
    { id: 4, name: "ABDUL HAKEEM K K" },
    { id: 5, name: "ABDUL JALEEL" },
    { id: 6, name: "ABHILASH PACKING SOLUTIONS PRIVATE LIMITED" },
    { id: 7, name: "ABRECO TRADERS PVT LTD (NEW)" },
    { id: 8, name: "ABU ABDUL RAHEEM AL NABHANI AN" },
  ];

  return (
    <Box
      sx={{
        width: 375,
        mx: "auto",
        minHeight: "100vh",
        bgcolor: "#F6F6F6",
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
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={18} fontWeight={600}>
          Select a Customer
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* SEARCH + ACTIONS */}
      <Stack direction="row" spacing={1} px={2} py={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search customer name"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
          sx={{ bgcolor: "#fff", borderRadius: 2 }}
        />

        <IconButton
          sx={{
            bgcolor: "#FFC107",
            borderRadius: 2,
            width: 44,
          }}
        >
          <SortIcon />
        </IconButton>

        <IconButton
          sx={{
            bgcolor: "#FFC107",
            borderRadius: 2,
            width: 44,
          }}
        >
          <TuneIcon />
        </IconButton>
      </Stack>

      {/* CUSTOMER LIST */}
      <Box px={2} pb={2}>
        {customers.map((cust) => (
          <Card
            key={cust.id}
            sx={{
              mb: 1.5,
              p: 1.5,
              borderRadius: 3,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => {
              // later: navigate to create invoice with selected customer
              console.log("Selected:", cust.name);
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: "#F3E5F5",
                  color: "#6A1B9A",
                  fontSize: 13,
                  width: 36,
                  height: 36,
                }}
              >
                {cust.name.substring(0, 2).toUpperCase()}
              </Avatar>

              <Typography fontSize={14} fontWeight={600}>
                {cust.name}
              </Typography>
            </Stack>

            <ChevronRightIcon color="action" />
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default SelectCustomer;
