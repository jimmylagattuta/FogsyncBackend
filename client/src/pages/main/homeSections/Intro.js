import React, { useState, useEffect } from 'react';
import './Intro.css';

const imagesMobile = [
  "https://i.postimg.cc/MpFYWV0g/HDAl-Z7d-1.webp",
  "https://i.postimg.cc/nr2vNDcR/fiqweb3-1.webp",
  "https://i.postimg.cc/7PKJ8DnW/d-Rbh-Xia-1-1.webp",
  "https://i.postimg.cc/mDRjqRyr/7-K3-Uz6-A-1-1-2.webp",
  "https://i.postimg.cc/vH1r0cwz/b-Rqb-Id5-2-1.webp"
];

const imagesTablet = [
  "https://i.postimg.cc/tgrdrPJB/HDAl-Z7d-3-1.webp",
  "https://i.postimg.cc/4NC6FX4R/fiqweb3-3.webp",
  "https://i.postimg.cc/9fNTPhgS/d-Rbh-Xia-2.webp",
  "https://i.postimg.cc/PJ1wk8fs/7-K3-Uz6-A-1-1-3.webp",
  "https://i.postimg.cc/CM8D89GP/b-Rqb-Id5-2-2.webp"
];

const imagesDesktop = [
  "https://i.postimg.cc/Wb234yXJ/HDAl-Z7d-4.webp",
  "https://i.postimg.cc/K8MdhGB7/fiqweb3-5.webp",
  "https://i.postimg.cc/kGHhLz5h/d-Rbh-Xia-3.webp",
  "https://i.postimg.cc/Jnv22S0Y/7-K3-Uz6-A-1-2.webp",
  "https://i.postimg.cc/d3CxPnTs/b-Rqb-Id5-3.webp"
];

const Intro = ({ scrollToContact }) => {
  const [currentImage, setCurrentImage] = useState(0);
  // Default to mobile images
  const [images, setImages] = useState(imagesMobile);
  // Track whether we're still on the initial load for index 0
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    try {
      const width = window.innerWidth;
      console.log("Window width:", width);
      if (width >= 1024) {
        setImages(imagesDesktop);
        console.log("Using desktop images.");
      } else if (width >= 768) {
        setImages(imagesTablet);
        console.log("Using tablet images.");
      } else {
        setImages(imagesMobile);
        console.log("Using mobile images.");
      }
    } catch (error) {
      console.error("Failed to set images based on screen width:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const interval = setInterval(() => {
        setCurrentImage((prevImage) => {
          const nextImage = (prevImage + 1) % images.length;
          console.log("Switching image to index:", nextImage);
          return nextImage;
        });
      }, 3000); // Switches images every 3 seconds
      console.log("Image interval started.");
      return () => {
        clearInterval(interval);
        console.log("Image interval cleared.");
      };
    } catch (error) {
      console.error("Failed to start image interval:", error);
    }
  }, [images]);

  useEffect(() => {
    if (currentImage !== 0 && isInitialLoad) {
      console.log("Initial load complete; first image has been displayed.");
      setIsInitialLoad(false);
    }
  }, [currentImage, isInitialLoad]);

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
            loading={index === 0 ? "eager" : "lazy"}
            className={`hero-image ${
              !isInitialLoad ? (index === currentImage ? 'fade-in' : 'fade-out') : ''
            }`}
            style={index === 0 && isInitialLoad ? { opacity: 1, transition: 'none' } : {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Intro;
