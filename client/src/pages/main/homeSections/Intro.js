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
  const [images, setImages] = useState(imagesMobile);
  // 'fade' triggers the transition phase after 4 seconds.
  const [fade, setFade] = useState(false);
  // Controls the opacity for the second image.
  const [secondOpacity, setSecondOpacity] = useState(0);

  // Update images based on current window width.
  const updateImages = () => {
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
  };

  // On mount and resize, update the image set.
  useEffect(() => {
    updateImages();
    window.addEventListener("resize", updateImages);
    return () => window.removeEventListener("resize", updateImages);
  }, []);

  // After 4 seconds, trigger the fade transition.
  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      console.log("Fade out started.");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // When fade is triggered, start the second image fade-in after a slight delay.
  useEffect(() => {
    if (fade) {
      const timer = setTimeout(() => {
        setSecondOpacity(1);
        console.log("Second image fade in started.");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [fade]);

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
        {/* First Image: Visible immediately, then fades out */}
        <img
          src={images[0]}
          alt="Hero"
          loading="eager"
          className="hero-image"
          style={
            !fade
              ? { opacity: 1, transition: 'none' }
              : { opacity: 0, transition: 'opacity 1s ease-out' }
          }
        />
        {/* Second Image: Lazily loaded, starts with opacity 0 then fades in */}
        {fade && (
          <img
            src={images[1]}
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
};

export default Intro;
