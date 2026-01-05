import React, { useEffect, useState } from "react";
import "../assets/create-expense.css";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("/api/resource/Expense Claim", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data.data || []));
  }, []);

  return (
    <div className="app">
      <div className="header">
        Expenses
        <button
          style={{ float: "right", background: "#fff", color: "#28a745" }}
          onClick={() => (window.location.hash = "#/create-expense")}
        >
          + Add Expense
        </button>
      </div>

      <div className="form">
        {expenses.length === 0 && <p>No expenses found</p>}

        {expenses.map((exp) => (
          <div key={exp.name} className="card">
            <b>{exp.name}</b>
            <div>Status: {exp.status}</div>
            <div>Date: {exp.posting_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
