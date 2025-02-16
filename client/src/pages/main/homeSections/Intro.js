import React, { useState, useEffect } from 'react';
import './Intro.css';

export default function Intro({ scrollToContact }) {
  const [imgs, setImgs] = useState([]);
  const [fade, setFade] = useState(false);
  const [secondOpacity, setSecondOpacity] = useState(0);

  // Dynamically import images based on current screen width
  const handleResize = async () => {
    const width = window.innerWidth;
    // Decide which file to load
    const path =
      width >= 1024
        ? '../../../images/desktopImages.js'
        : width >= 768
        ? '../../../images/tabletImages.js'
        : '../../../images/mobileImages.js';

    try {
      const mod = await import(path);
      setImgs(mod.default); // e.g., [url1, url2, url3, url4, url5]
    } catch (e) {
      console.error('Error loading images:', e);
    }
  };

  // Load correct images on mount & handle window resizing
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Wait 4 seconds, then fade out the first image
  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Once fade is triggered, fade in the second image after a brief delay
  useEffect(() => {
    if (fade) {
      const timer = setTimeout(() => setSecondOpacity(1), 50);
      return () => clearTimeout(timer);
    }
  }, [fade]);

  // If images not loaded yet, show a quick fallback or nothing
  if (!imgs.length) {
    return (
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Welcome to BCB Carts!</h1>
            <p>Your Trusted Partner in Leisure-Filled Electric Vehicles</p>
            <button className="hero-button" onClick={scrollToContact}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    );
  }

  // We'll fade from imgs[3] (the 4th image) to imgs[4] (the 5th image).
  const firstImg = imgs[3];
  const secondImg = imgs[4];

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Welcome to BCB Carts!</h1>
          <p>Your Trusted Partner in Leisure-Filled Electric Vehicles</p>
          <button className="hero-button" onClick={scrollToContact}>
            Contact Us
          </button>
        </div>
      </div>

      <div className="hero-image-container">
        {/* First image: visible immediately, then fades out after 4s */}
        <img
          src={firstImg}
          alt="Hero"
          loading="eager"
          className="hero-image"
          style={
            !fade
              ? { opacity: 1, transition: 'none' }
              : { opacity: 0, transition: 'opacity 1s ease-out' }
          }
        />

        {/* Second image: starts at opacity 0, then fades in once fade === true */}
        {fade && secondImg && (
          <img
            src={secondImg}
            alt="Hero 2"
            loading="lazy"
            className="hero-image"
            style={{
              opacity: secondOpacity,
              transition: 'opacity 1s ease-in'
            }}
          />
        )}
      </div>
    </div>
  );
}
