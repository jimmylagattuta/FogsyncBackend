import React, { useState, useEffect } from 'react';
import './Intro.css';

const imagesMobile = [
  "https://i.postimg.cc/MpFYWV0g/HDAl-Z7d-1.webp",
  "https://i.postimg.cc/nr2vNDcR/fiqweb3-1.webp",
  "https://i.postimg.cc/7PKJ8DnW/d-Rbh-Xia-1-1.webp",
  "https://i.postimg.cc/mDRjqRyr/7-K3-Uz6-A-1-1-2.webp",
  "https://i.postimg.cc/vH1r0cwz/b-Rqb-Id5-2-1.webp"
];

const imagesDesktop = [
  'https://i.imgur.com/HDAlZ7d.jpeg',
  'https://i.imgur.com/fiqweb3.jpeg',
  'https://i.imgur.com/dRbhXia.jpeg',
  'https://i.imgur.com/7K3Uz6A.jpeg',
  'https://i.imgur.com/bRqbId5.jpeg'
];

const Intro = ({ scrollToContact }) => {
  const [currentImage, setCurrentImage] = useState(0);
  // New state: start with mobile images
  const [images, setImages] = useState(imagesMobile);

  useEffect(() => {
    // Check if the screen is above 767 pixels on mount and update images accordingly
    if (window.innerWidth > 767) {
      setImages(imagesDesktop);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Switches images every 3 seconds
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Welcome to BCB Carts!</h1>
          <p>Your Trusted Partner in Leisure-Filled Electric Vehicles</p>
          <button className="hero-button" onClick={scrollToContact}>Contact Us</button>
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
