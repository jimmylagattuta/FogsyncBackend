import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSnapchat, faTiktok, faInstagram, faPinterest, faThreads } from '@fortawesome/free-brands-svg-icons';
import './Social.css';

function Social() {
  const iconRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredButton, setHoveredButton] = useState({
    email: 'Email Us',
    longBeach: 'Call Long Beach, CA',
    griffin: 'Call Griffin, GA'
  });

  useEffect(() => {
    // Check if the device is mobile
    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setHoveredButton({
          email: 'Contact via Email: mebcb@yahoo.com',
          longBeach: 'Contact Long Beach, CA: +13233333471',
          griffin: 'Contact Griffin, GA: +13233333471'
        });
      } else {
        setIsMobile(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    iconRefs.current.forEach((icon) => {
      if (icon) observer.observe(icon);
    });

    return () => {
      iconRefs.current.forEach((icon) => {
        if (icon) observer.unobserve(icon);
      });
    };
  }, []);

  const handleHover = (index) => {
    iconRefs.current.forEach((icon, idx) => {
      if (icon) {
        if (idx !== index) {
          icon.classList.add('disable-shadow');
        } else {
          icon.classList.remove('disable-shadow');
        }
      }
    });
  };

  const handleMouseLeave = () => {
    iconRefs.current.forEach((icon) => {
      if (icon) {
        icon.classList.remove('disable-shadow');
      }
    });
  };

  const handleButtonHover = (button) => {
    if (!isMobile) {
      setHoveredButton((prev) => ({
        ...prev,
        [button]: button === 'email'
          ? 'Contact via Email: mebcb@yahoo.com'
          : button === 'longBeach'
          ? 'Contact Long Beach: +13233333471'
          : 'Contact Griffin: +13233333471'
      }));
    }
  };

  const handleButtonLeave = (button) => {
    if (!isMobile) {
      setHoveredButton((prev) => ({
        ...prev,
        [button]: button === 'email'
          ? 'Email Us'
          : button === 'longBeach'
          ? 'Call Long Beach, CA'
          : 'Call Griffin, GA'
      }));
    }
  };

  return (
    <div className="social-media">
      <hr className="underline" />

      <h2 className="social-media-title">Connect With Us</h2>
      <div className="social-icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon facebook"
          ref={(el) => (iconRefs.current[0] = el)}
          onMouseEnter={() => handleHover(0)}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://snapchat.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon snapchat"
          ref={(el) => (iconRefs.current[1] = el)}
          onMouseEnter={() => handleHover(1)}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faSnapchat} />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon tiktok"
          ref={(el) => (iconRefs.current[2] = el)}
          onMouseEnter={() => handleHover(2)}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faTiktok} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon instagram"
          ref={(el) => (iconRefs.current[3] = el)}
          onMouseEnter={() => handleHover(3)}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon pinterest"
          ref={(el) => (iconRefs.current[4] = el)}
          onMouseEnter={() => handleHover(4)}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faPinterest} />
        </a>
        <a
          href="https://threads.net"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon threads"
          ref={(el) => (iconRefs.current[5] = el)}
          onMouseEnter={() => handleHover(5)}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faThreads} />
        </a>
      </div>

      <hr className="underline" />

      <div className="contact-info">
        <a
          href="mailto:mebcb@yahoo.com"
          className="contact-button email-button"
          onMouseEnter={() => handleButtonHover('email')}
          onMouseLeave={() => handleButtonLeave('email')}
        >
          {hoveredButton.email}
        </a>
        <a
          href="tel:+13233333471"
          className="contact-button phone-button"
          onMouseEnter={() => handleButtonHover('longBeach')}
          onMouseLeave={() => handleButtonLeave('longBeach')}
        >
          {hoveredButton.longBeach}
        </a>
        <a
          href="tel:+13233333471"
          className="contact-button phone-button"
          onMouseEnter={() => handleButtonHover('griffin')}
          onMouseLeave={() => handleButtonLeave('griffin')}
        >
          {hoveredButton.griffin}
        </a>
      </div>
      
      <div className="footer-info">
        <p className="copyright">© 2024 BCB Carts</p>
        <div className="divider"></div> {/* Divider between the two texts */}
        <p className="powered-by">Powered by James Lagattuta</p>
      </div>
    </div>
  );
}

export default Social;
