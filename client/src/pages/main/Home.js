import React from 'react';
import './Home.css';
import Intro from './homeSections/Intro';
import Social from '../../components/Social';
import Company from './homeSections/Company';
import AboutSection from './homeSections/AboutSection';
import ServiceList from './homeSections/ServiceList';
import MapContainer from './homeSections/MapContainer';
import ReviewsComponent from '../../components/ReviewsComponent';

const Home = ({ scrollToContact, reviews }) => {
  console.log('Home');
  return (
    <div>
      <Intro scrollToContact={scrollToContact} />
      <Social />
      <Company />
      <AboutSection />
      <ServiceList />
      <MapContainer />
      <ReviewsComponent reviews={reviews} />
    </div>
  );
}

export default Home;
