import React from 'react';
import './SEOFriendlyHomepage.css';

function SEOFriendlyHomepage() {
  return (
    <div className="seo-homepage">
      {/* 🏷️ Meta Tags for SEO */}
      <head>
        <title>BCB Carts | Electric Cart Sales, Rentals, and Repairs in Long Beach</title>
        <meta
          name="description"
          content="BCB Carts offers electric cart sales, rentals, and repairs in Long Beach, Seal Beach, Huntington Beach, San Pedro, and Lakewood. Explore custom carts, lithium upgrades, and event rentals."
        />
        <meta
          name="keywords"
          content="Electric carts for sale, Golf cart rentals, Cart repairs, Long Beach, Seal Beach, Huntington Beach, San Pedro, Lakewood"
        />
      </head>

      {/* 🏷️ H1 Heading for SEO */}
      <h1>BCB Carts | Electric Cart Sales, Rentals, and Repairs</h1>

      {/* 🛒 Cart Sales Section */}
      <section>
        <h2>Electric Carts for Sale</h2>
        <p>
          Explore our range of electric carts, including custom golf carts, lithium-powered carts, and street-legal low-speed vehicles (LSVs). We proudly serve customers in Long Beach, Seal Beach, Huntington Beach, San Pedro, and Lakewood.
        </p>
      </section>

      {/* 🛠️ Cart Repairs Section */}
      <section>
        <h2>Expert Golf Cart Repairs & Maintenance</h2>
        <p>
          Our certified technicians offer mobile and on-site golf cart repairs, lithium battery replacements, custom welds, and electrical diagnostics. Get your cart serviced quickly in Long Beach, Seal Beach, and surrounding areas.
        </p>
      </section>

      {/* 🚘 Cart Rentals Section */}
      <section>
        <h2>Golf Cart Rentals for Every Occasion</h2>
        <p>
          Rent electric carts for daily, weekly, or event use. Perfect for beach towns, weddings, festivals, and corporate events. Serving Long Beach, Huntington Beach, and nearby communities.
        </p>
      </section>

      {/* 📍 Local Service Areas Section */}
      <section>
        <h2>Serving Long Beach & Surrounding Cities</h2>
        <p>
          We proudly serve customers from Long Beach, Seal Beach, Huntington Beach, San Pedro, Lakewood, and other Southern California communities.
        </p>
      </section>

      {/* ⭐ Customer Reviews Section */}
      <section>
        <h2>What Our Customers Say</h2>
        <p>
          "Fantastic service from BCB Carts! Bought a custom electric cart for Huntington Beach and couldn't be happier." - Emily S.
        </p>
      </section>

      {/* 🔗 Call-to-Action Section */}
      <section>
        <h2>Contact Us Today</h2>
        <p>
          Ready to buy, rent, or repair a golf cart? Contact BCB Carts now!
        </p>
      </section>

      {/* 🔑 Keywords Section */}
      <section className="keywords">
        <h2>Keywords</h2>
        <ul>
          <li>Electric Carts Long Beach</li>
          <li>Golf Cart Rentals Huntington Beach</li>
          <li>Electric Vehicle Sales Seal Beach</li>
          <li>Low-Speed Vehicles San Pedro</li>
          <li>Electric Cart Repairs Lakewood</li>
          <li>Custom Golf Carts</li>
          <li>Eco-Friendly Vehicles</li>
          <li>Street-Legal Carts</li>
          <li>Repair & Maintenance</li>
          <li>Electric Carts for Sale</li>
          <li>Golf Carts Long Beach</li>
          <li>Custom Electric Carts</li>
          <li>Affordable Electric Carts</li>
        </ul>
      </section>
    </div>
  );
}

export default SEOFriendlyHomepage;
