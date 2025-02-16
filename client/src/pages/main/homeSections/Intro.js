import React, { useState, useEffect } from 'react';
import './Intro.css';

import mobileImages from './images/mobileImages';
import tabletImages from './images/tabletImages';
import desktopImages from './images/desktopImages';

export default function Intro({ scrollToContact }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState(mobileImages);

  // Decide which array to use based on screen width
  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setImages(desktopImages);
    } else if (width >= 768) {
      setImages(tabletImages);
    } else {
      setImages(mobileImages);
    }
  };

  // On mount and when window resizes
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cycle through images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

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
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            // Only the current image is displayed; others are hidden
            className={`hero-image ${index === currentImage ? 'show-slide' : 'hide-slide'}`}
          />
        ))}
      </div>
    </div>
  );
}
