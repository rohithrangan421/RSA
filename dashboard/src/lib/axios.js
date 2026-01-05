import axios from "axios"; 

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Basic ${token}`;
//   }
//   return config;
// });

