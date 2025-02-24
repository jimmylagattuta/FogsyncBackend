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
import SEOFriendlyHomepage from './pages/main/homeSections/SEOFriendlyHomepage';
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

  const scrollToContact = () => {
    const yOffset = -navbarHeight; // Adjust the offset by the height of the navbar
    const yPosition = contactSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: yPosition, behavior: 'smooth' });
  };

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
          <h1>Fogsync Has Landed!</h1>
      </div>
    </Router>
  );
}

export default App;
