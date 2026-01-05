// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "../assets/create-lead.css";

// /* Fix default marker icon */
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// export default function MapView() {
//   const [position, setPosition] = useState(null);
//   const [customers, setCustomers] = useState([]);

//   /* 1️⃣ Get current location */
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition([pos.coords.latitude, pos.coords.longitude]);
//       },
//       () => alert("Location permission required")
//     );
//   }, []);

//   /* 2️⃣ Fetch customer locations from ERPNext */
//   useEffect(() => {
//     fetch("/api/resource/Customer?fields=[\"name\",\"latitude\",\"longitude\"]", {
//       credentials: "include",
//     })
//       .then((r) => r.json())
//       .then((d) => {
//         setCustomers(d.data || []);
//       });
//   }, []);

//   if (!position) {
//     return <p style={{ textAlign: "center" }}>Fetching location...</p>;
//   }

//   return (
//     <div className="app" style={{ width: "100%", height: "100vh" }}>
//       <div className="header">Map View</div>

//       <MapContainer
//         center={position}
//         zoom={15}
//         style={{ height: "calc(100vh - 55px)", width: "100%" }}
//       >
//         <TileLayer
//           attribution="&copy; OpenStreetMap"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* 🔵 Current Location */}
//         <Marker position={position}>
//           <Popup>You are here</Popup>
//         </Marker>

//         {/* 🔴 Customer Pins */}
//         {customers.map(
//           (c) =>
//             c.latitude &&
//             c.longitude && (
//               <Marker
//                 key={c.name}
//                 position={[c.latitude, c.longitude]}
//               >
//                 <Popup>
//                   <b>{c.name}</b>
//                   <br />
//                   <a
//                     href={`https://www.google.com/maps/dir/?api=1&destination=${c.latitude},${c.longitude}`}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     Navigate →
//                   </a>
//                 </Popup>
//               </Marker>
//             )
//         )}
//       </MapContainer>
//     </div>
//   );
// }
