import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

import Home from './pages/main/Home';
import Sales from './pages/main/Sales';
import Rentals from './pages/main/Rentals';
import Parts from './pages/main/Parts';
import NavigationPage from './pages/main/Navigation';
import Help from './pages/main/Help';
import FAQ from './pages/main/FAQ';
import Contact from './pages/main/Contact';
import Services from './pages/main/Services';
import ContactUsChatbox from './pages/main/homeSections/ContactUsChatbox';
import AccountForms from './components/AccountForms';
import Social from './components/Social';
import Footer from './components/Footer';

function SocialContainer() {
  const location = useLocation();  // useLocation() inside the component within Router

  return location.pathname !== '/' ? <Social /> : null;  // Conditionally render based on route
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [signupFormVisible, setSignupFormVisible] = useState(false);
  const [loginFormVisible, setLoginFormVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const dropdownRef = useRef(null);
  const contactSectionRef = useRef(null);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log('user', user);
          setUser(user);
          setIsAuthenticated(true);
        });
      }
    });
  }, []);

  
  useEffect(() => {
    fetch("/pull_yelp_cache").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log('data', data);
          setReviews(data);
        });
      }
    });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const toggleSignupForm = () => {
    setSignupFormVisible(!signupFormVisible);
    if (loginFormVisible) {
      setLoginFormVisible(false);
    }
  };
  
  const toggleLoginForm = () => {
    setLoginFormVisible(!loginFormVisible);
    if (signupFormVisible) {
      setSignupFormVisible(false);
    }
  };

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

  const handleLogout = () => {
    fetch('/logout', { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          setUser(null);
        }
      });
  };

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <Router>
      <div className="navbar">
        <div className="navbar-top">
          <Link to="/" className="navbar-title-container">
            <span className="navbar-title">BCB</span>
            <img src={`${process.env.PUBLIC_URL}/BCBLogo.jpg`} className="navbar-logo" alt="logo" />
            <span className="navbar-subtitle">Carts</span>
          </Link>
          {window.innerWidth <= 860 ? (
            <>
              {user ? (
                <div
                  className={`username-container ${dropdownVisible ? 'dropdown-open' : ''}`}
                  ref={dropdownRef}
                  onClick={toggleDropdown}
                >
                  <span className="username">Hi{" "}{user.username}!</span>
                  {dropdownVisible && (
                    <div className="dropdown-content">
                      <a href="#" onClick={handleLogout}>Logout</a>
                    </div>
                  )}
                </div>
              ) : (
                <span className="signup-button" onClick={toggleSignupForm}>
                  Sign Up
                </span>
              )}
            </>
          ) : (
            <>
              {user ? (
                <div
                  className={`username-container ${dropdownVisible ? 'dropdown-open' : ''}`}
                  ref={dropdownRef}
                  onClick={toggleDropdown}
                  style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}  // Align container
                >
                  <span className="username-large">Hi {user.username}!</span>
                  {dropdownVisible && (
                    <div className="dropdown-content-large">
                      <a href="#" onClick={handleLogout}>Logout</a>
                    </div>
                  )}
                </div>
              ) : (
                <span className="signup-button-large" onClick={toggleSignupForm}>
                  Sign Up
                </span>
              )}

            </>
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
          <Link to="/services" onClick={closeMenu}>Services</Link>
          {/* <Link to="/navigation" onClick={closeMenu}>Navigation</Link> */}
          <Link to="/help" onClick={closeMenu}>Help</Link>
          {/* <Link to="/faq" onClick={closeMenu}>FAQ</Link> */}
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </div>
      </div>
      <div className="content" style={{ paddingTop: `${navbarHeight}px` }}>
        <Routes>
          <Route path="/" element={<Home scrollToContact={scrollToContact} />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/services" element={<Services />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <div ref={contactSectionRef}>
        <ContactUsChatbox />
      </div>
      <AccountForms
        toggleLoginForm={toggleLoginForm}
        toggleSignupForm={toggleSignupForm}
        signupFormVisible={signupFormVisible}
        loginFormVisible={loginFormVisible}
        user={user}
        setUser={setUser}
      />
      <SocialContainer />
      <Footer />
    </Router>
  );
}

export default App;
