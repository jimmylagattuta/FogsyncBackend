import React, { useEffect, useRef } from 'react';
import './Company.css';

function Company() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.classList.add('reveal');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="company-diagonal-section" ref={sectionRef}>
      <div className="diagonal-reveal"></div>
      <div className="company-content">
        <hr className="custom-line" /> {/* Line added above */}
        <h2 className="company-title">Slogan/Title Here</h2>
        <p className="company-description">
          About BCB Carts content here. Delivering excellence with a personalized touch. Our experts are here to meet your needs with precision and professionalism. Delivering excellence with a personalized touch. Our experts are here to meet your needs with precision and professionalism.
        </p>
        <hr className="custom-line" /> {/* Line added below */}
      </div>
    </section>
  );
}

export default Company;
