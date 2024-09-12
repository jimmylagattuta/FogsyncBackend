import React from 'react';
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
  return (
    <section className="service-list-section">
      <h1 className="service-list-title">Explore Our Services</h1>
      <i className="fab fa-opencart title-symbol"></i> {/* No inline styles */}
      
      <div className="service-list-grid">
        {services.map((service, index) => (
          <div className="service-item" key={index}>
            <img src={service.image} alt={service.name} className="service-image" />
            <h3 className="service-name">{service.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceList;
