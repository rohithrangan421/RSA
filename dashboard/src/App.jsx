// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import LeadsList from "./pages/LeadsList";
// import CreateLead from "./pages/CreateLead";
// import CreateExpense from "./pages/CreateExpense";
// import ExpenseList from "./pages/ExpenseList";

// function App() {
//   return (
//     <Routes>
//       {/* HOME */}
//       <Route path="/" element={<LeadsList />} />
//       <Route path="/expenses" element={<ExpenseList />} />

//       {/* LEAD */}
//       <Route path="/create-lead" element={<CreateLead />} />

//       {/* EXPENSE */}
//       <Route path="/create-expense" element={<CreateExpense />} />

//       {/* FALLBACK */}
//       <Route path="*" element={<LeadsList />} />
//     </Routes>
//   );
// }

// export default App;

// import Login from "./pages/Login";

// export default function App() {
//   return <Login />;
// }
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import LeadsList from "./pages/LeadsList";
import CreateLead from "./pages/CreateLead";
import CreateExpense from "./pages/CreateExpense";
import ExpenseList from "./pages/ExpenseList";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/sign-in" replace />} />

      {/* LOGIN */}
      <Route path="/sign-in" element={<Login />} />

      {/* DASHBOARD LAYOUT */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="leads" element={<LeadsList />} />
        <Route path="create-lead" element={<CreateLead />} />
      <Route path="/dashboard" element={<Dashboard />}>
  <Route path="expenses" element={<ExpenseList />} />
  <Route path="create-expense" element={<CreateExpense />} />
</Route>

      </Route>
    </Routes>
  );
}

export default App;
