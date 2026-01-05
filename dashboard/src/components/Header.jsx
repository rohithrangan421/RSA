function Header({ userName }) {
  return (
    <div className="header">
      <div>
        <h2>Good Afternoon</h2>
        <h1>{userName}</h1>
      </div>
      <div className="profile">👤</div>
    </div>
  );
}

export default Header;