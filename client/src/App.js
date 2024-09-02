import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './pages/main/Home';
import Sales from './pages/main/Sales';
import Rentals from './pages/main/Rentals';
import Parts from './pages/main/Parts';
import NavigationPage from './pages/main/Navigation';
import Help from './pages/main/Help';
import FAQ from './pages/main/FAQ';
import Contact from './pages/main/Contact';
import SignupForm from './components/SignupForm';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [signupFormVisible, setSignupFormVisible] = useState(false);
  const [loginFormVisible, setLoginFormVisible] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const toggleSignupForm = () => setSignupFormVisible(!signupFormVisible);
  const toggleLoginForm = () => setLoginFormVisible(!loginFormVisible);


  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    setNavbarHeight(navbar.offsetHeight);

    const handleResize = () => {
      setNavbarHeight(navbar.offsetHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-top">
          <Link to="/" className="navbar-title-container">
            <span className="navbar-title">BCB</span>
            <img src={`${process.env.PUBLIC_URL}/BCBLogo.jpg`} className="navbar-logo" alt="logo" />
            <span className="navbar-subtitle">Carts</span>
          </Link>
          {window.innerWidth <= 860 && (
            <span className="signup-button" onClick={toggleSignupForm}>
              Sign Up
            </span>
          )}
          <div className="hamburger" onClick={(e) => { e.preventDefault(); toggleMenu(); }}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
        <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/sales" onClick={closeMenu}>Sales</Link>
          <Link to="/rentals" onClick={closeMenu}>Rentals</Link>
          <Link to="/parts" onClick={closeMenu}>Parts</Link>
          <Link to="/navigation" onClick={closeMenu}>Navigation</Link>
          <Link to="/help" onClick={closeMenu}>Help</Link>
          <Link to="/faq" onClick={closeMenu}>FAQ</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </div>
      </div>
      <div className="content" style={{ paddingTop: `${navbarHeight}px` }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      {signupFormVisible && (
        <div className="signup-form-overlay">
          <SignupForm toggleLoginForm={toggleLoginForm} />
          <div className="close-signup-button" onClick={toggleSignupForm}>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      )}

    </Router>
  );
}

export default App;
