function Header({ userName }) {
  return (
    <div className="header">
      <div>
        <p className="greeting">Good Afternoon</p>
        <h2>{userName}</h2>
      </div>
      <div className="profile">👤</div>
    </div>
  );
}

export default Header;
