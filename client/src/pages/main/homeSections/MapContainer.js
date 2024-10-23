import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import './MapContainer.css'; // New CSS for MapContainer

const offices = [
  {
    id: 1,
    city: 'Long Beach',
    addressOne: '1334 Orange Ave',
    addressTwo: 'Long Beach, CA 90813',
    phone: '323-333-3471',
    image: 'https://i.imgur.com/mB6Lo8H.webp',
    coordinates: { lat: 33.7866, lng: -118.1917 },
    hours: '8 AM - 5 PM'
  },
  {
    id: 2,
    city: 'Griffin',
    addressOne: '1640 Williamson Rd',
    addressTwo: 'Griffin, GA 30224',
    phone: '323-333-3471',
    image: 'https://i.imgur.com/WoTdzUQ.webp',
    coordinates: { lat: 33.2468, lng: -84.2640 },
    hours: '8 AM - 5 PM'
  }
];

const Marker = ({ lat, lng, text }) => (
  <div className="map-marker">
    <i className="fas fa-map-marker-alt"></i>
    <span>{text}</span>
  </div>
);

const MapContainer = () => {
  // Calculate the midpoint between Long Beach and Griffin
  const midLat = (33.7866 + 33.2468) / 2;
  const midLng = (-118.1917 + -84.2640) / 2;

  const [centered, setCentered] = useState({ lat: midLat, lng: midLng });
  const [zoomLevel, setZoomLevel] = useState(5); // Default zoom level 5

  const handleResize = () => {
    if (window.innerWidth <= 1160) {
      setZoomLevel(9); // Adjust zoom level for smaller screens
    } else {
      setZoomLevel(5); // Default zoom level
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  console.log('REACT_APP_GOOGLE_MAPS_REACT_KEY', process.env.REACT_APP_GOOGLE_MAPS_REACT_KEY);
  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_REACT_KEY }}
        center={centered}
        zoom={zoomLevel} // Updated zoom level prop
      >
        {offices.map((office) => (
          <Marker
            key={office.id}
            lat={office.coordinates.lat}
            lng={office.coordinates.lng}
            text={office.city}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
