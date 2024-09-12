import React, { useEffect, useRef } from 'react';
import './ServiceList.css';

const services = [
  { name: 'Service/Product', image: 'https://i.imgur.com/MF4hl3z.jpeg' },
  { name: 'Service/Product', image: 'https://i.imgur.com/MF4hl3z.jpeg' },
  { name: 'Service/Product', image: 'https://i.imgur.com/MF4hl3z.jpeg' },
  { name: 'Service/Product', image: 'https://i.imgur.com/MF4hl3z.jpeg' },
  { name: 'Service/Product', image: 'https://i.imgur.com/MF4hl3z.jpeg' },
  { name: 'Service/Product', image: 'https://i.imgur.com/MF4hl3z.jpeg' },
  { name: 'Service/Product', image: 'https://i.imgur.com/MF4hl3z.jpeg' },
  { name: 'Service/Product', image: 'https://i.imgur.com/MF4hl3z.jpeg' }
];

function ServiceList() {
  const serviceRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ease-in');
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the item is visible
    );

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      serviceRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="service-list-section">
      <h1 className="service-list-title">Explore Our Services</h1>
      <i className="fab fa-opencart title-symbol"></i>

      <div className="service-list-grid">
        {services.map((service, index) => (
          <div
            className="service-item"
            key={index}
            ref={(el) => (serviceRefs.current[index] = el)}
          >
            <img src={service.image} alt={service.name} className="service-image" />
            <h3 className="service-name">{service.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceList;
