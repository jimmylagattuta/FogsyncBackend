import React from 'react';
import './App.css';

function App() {
  return (
    <div className="Navbar">
      <img src={`${process.env.PUBLIC_URL}/BCBLogo.jpg`} className="Navbar-logo" alt="logo" />
      <span className="Navbar-title">BCB Carts</span>
    </div>
  );
}

export default App;
