import React, { useState, useEffect } from 'react';
import './Intro.css';

const images = [
  'https://i.imgur.com/HDAlZ7d.jpeg',
  'https://i.imgur.com/fiqweb3.jpeg',
  'https://i.imgur.com/dRbhXia.jpeg',
  'https://i.imgur.com/7K3Uz6A.jpeg', 
  'https://i.imgur.com/azdpeAP.jpeg'
];

const Intro = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Change image every 3s
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Your Slogan Goes Here</h1>
          <p>Here is a short description of whatever you want.</p>
          <button className="hero-button">Any Button</button>
        </div>
      </div>
      <div className="hero-image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Slideshow"
            className={`hero-image ${index === currentImage ? 'fade-in' : 'fade-out'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Intro;
