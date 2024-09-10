import React, { useState, useEffect } from 'react';
import './Intro.css';

const images = [
  'https://i.imgur.com/HDAlZ7d.jpeg',
  'https://i.imgur.com/fiqweb3.jpeg',
  'https://i.imgur.com/dRbhXia.jpeg',
  'https://i.imgur.com/Y0EB8Q4.jpeg',
  'https://i.imgur.com/azdpeAP.jpeg'
];

const Intro = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Switches images every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Your Slogan Goes Here</h1>
          <p>Here is a short description of whatever you want.</p>
          <button className="hero-button">Lorem Ipsum</button>
        </div>
      </div>
      <div className="hero-image-container">
        <img
          src={images[currentImage]}
          alt="Golf Cart"
          className="hero-image"
        />
      </div>
    </div>
  );
};

export default Intro;
