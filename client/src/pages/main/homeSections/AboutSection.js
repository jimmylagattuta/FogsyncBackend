import React from 'react';
import './AboutSection.css';

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-image"></div> {/* Image first */}
      <div className="about-content">
        <h2 className="about-title">Slogan/Title Here</h2>
        <p className="about-description">
            About BCB Carts content here. Delivering excellence with a personalized touch etc.
          <br /><br />
            About BCB Carts content here. Delivering excellence with a personalized touch etc. Our experts are here to meet your needs etc with precision and professionalism. 
          <br /><br />
            About BCB Carts content here. Delivering excellence with a personalized touch etc. Our experts are here to meet your needs etc with precision and professionalism. Delivering excellence with a personalized touch etc. Our experts are here to meet your needs etc with precision and professionalism.
        </p>
        <button className="about-button">Your Button</button>
      </div>
    </section>
  );
}

export default AboutSection;
