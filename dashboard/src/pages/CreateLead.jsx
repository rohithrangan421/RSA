// import React, { useState } from "react";
// import { axiosClient } from "../lib/axios";
// import "../assets/create-lead.css";

// export default function CreateLead() {
//   const [form, setForm] = useState({
//     image: null,
//     leadName: "",
//     email: "",
//     phone: "",
//     territory: "",
//     customerGroup: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setForm({ ...form, image: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const clearForm = () => {
//     setForm({
//       image: null,
//       leadName: "",
//       email: "",
//       phone: "",
//       territory: "",
//       customerGroup: "",
//     });
//   };

//   const submitForm = async () => {
//     if (!form.leadName) {
//       alert("First Name is required");
//       return;
//     }

//     const payload = {
//       first_name: form.leadName,
//       organization_name: form.leadName,
//       email: form.email,
//       phone: form.phone,
//       territory: form.territory,
//       customer_group: form.customerGroup,
//     };

//     try {
//       const res = await axiosClient.post(
//         "/method/route_sales.api.lead.create_lead",
//         payload
//       );

//       if (res.data.message?.status === "success") {
//         alert("Lead created successfully ✅");
//         clearForm();
//         window.location.href = "/dashboard/leads";
//       } else {
//         alert("Failed ❌");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error ❌");
//     }
//   };

//   return (
//     <div className="lead-page">
//       {/* HEADER */}
//       <div className="lead-header">
//         <span className="back-arrow">←</span>
//         <h3>Create New Lead</h3>
//       </div>

//       {/* FORM CARD */}
//       <div className="lead-card">
//         {/* IMAGE + NAME */}
//         <div className="image-row">
//           <label className="image-box">
//             {form.image ? (
//               <img src={URL.createObjectURL(form.image)} alt="preview" />
//             ) : (
//               <span className="camera-icon">📷</span>
//             )}
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               hidden
//               onChange={handleChange}
//             />
//           </label>

//           <div className="input-group">
//             <label>Lead Name</label>
//             <input
//               type="text"
//               name="leadName"
//               placeholder="Enter Lead Name"
//               value={form.leadName}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="input-group">
//           <label>Email Address</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email Address"
//             value={form.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Phone Number</label>
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Enter Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Territory</label>
//           <select name="territory" value={form.territory} onChange={handleChange}>
//             <option value="">Select Territory</option>
//             <option value="India">India</option>
//             <option value="Kerala">Kerala</option>
//           </select>
//         </div>

//         <div className="input-group">
//           <label>Customer Group</label>
//           <select
//             name="customerGroup"
//             value={form.customerGroup}
//             onChange={handleChange}
//           >
//             <option value="">Select Customer Group</option>
//             <option value="Commercial">Commercial</option>
//             <option value="Individual">Individual</option>
//           </select>
//         </div>

//         <button className="btn-primary" onClick={submitForm}>
//           Create Leads
//         </button>

//         <button className="btn-outline" onClick={clearForm}>
//           Clear Form
//         </button>
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
  MenuItem,
  Card,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { axiosClient } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosClient } from "../lib/axios";

export default function CreateLead() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    leadName: "",
    email: "",
    phone: "",
    territory: "",
    customerGroup: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const clearForm = () =>
    setForm({
      leadName: "",
      email: "",
      phone: "",
      territory: "",
      customerGroup: "",
    });

  const submitForm = async () => {
    if (!form.leadName) return alert("Lead name required");

    await axiosClient.post("/method/route_sales.api.lead.create_lead", {
      first_name: form.leadName,
      organization_name: form.leadName,
      email: form.email,
      phone: form.phone,
      territory: form.territory,
      customer_group: form.customerGroup,
    });

    navigate("/dashboard/leads");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FFF7EF" }}>
      {/* TOP BAR */}
      <AppBar position="static" sx={{ bgcolor: "#FF9F43", boxShadow: "none" }}>
        <Toolbar>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>
            Create New Lead
          </Typography>
        </Toolbar>
      </AppBar>

      {/* CONTENT */}
      <Box px={2} mt={2}>
        <Card
          sx={{
            borderRadius: 3,
            p: 2.5,
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >
          {/* CAMERA + LEAD NAME */}
          <Box display="flex" gap={2} mb={3}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                border: "2px dashed #BDBDBD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CameraAltOutlinedIcon sx={{ color: "#9E9E9E" }} />
            </Box>

            <Box flex={1}>
              <Typography fontSize={13} fontWeight={600} mb={0.5}>
                Lead Name
              </Typography>
              <TextField
                fullWidth
                name="leadName"
                placeholder="Enter Lead Name"
                value={form.leadName}
                onChange={handleChange}
                size="small"
              />
            </Box>
          </Box>

          {/* EMAIL */}
          <Typography fontSize={13} fontWeight={600} mb={0.5}>
            Email Address
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            size="small"
            sx={{ mb: 2 }}
          />

          {/* PHONE */}
          <Typography fontSize={13} fontWeight={600} mb={0.5}>
            Phone Number
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            size="small"
            sx={{ mb: 2 }}
          />

          {/* TERRITORY */}
          <Typography fontSize={13} fontWeight={600} mb={0.5}>
            Territory
          </Typography>
          <TextField
            select
            fullWidth
            name="territory"
            value={form.territory}
            onChange={handleChange}
            size="small"
            SelectProps={{
              IconComponent: KeyboardArrowDownIcon,
            }}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Territory</MenuItem>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="Kerala">Kerala</MenuItem>
          </TextField>

          {/* CUSTOMER GROUP */}
          <Typography fontSize={13} fontWeight={600} mb={0.5}>
            Customer Group
          </Typography>
          <TextField
            select
            fullWidth
            name="customerGroup"
            value={form.customerGroup}
            onChange={handleChange}
            size="small"
            SelectProps={{
              IconComponent: KeyboardArrowDownIcon,
            }}
            sx={{ mb: 3 }}
          >
            <MenuItem value="">Select Customer Group</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Individual">Individual</MenuItem>
          </TextField>

          {/* BUTTONS */}
          <Button
            fullWidth
            onClick={submitForm}
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
            Create Leads
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
