function CustomerCard({ customer }) {
  return (
    <div className="customer-card">
      <h3>{customer.name}</h3>
      <p>📍 {customer.address}</p>

      <div className="stats-row">
        <span>Total Sales: 0</span>
        <span>Total Payment: 0</span>
      </div>

      <div className="actions">
        <button className="btn gray">Payment</button>
        <button className="btn yellow">Quick Order</button>
      </div>
    </div>
  );
}

export default CustomerCard;
