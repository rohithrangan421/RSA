// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>dashboard</div>
//   )
// }

// export default Dashboard



import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#eaeaea",
      }}
    >
      {/* PHONE WRAPPER */}
      <Box
        sx={{
          width: 390,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        }}
      >
        {/* 🔥 NO DASHBOARD HEADER HERE */}

        {/* PAGE CONTENT */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
