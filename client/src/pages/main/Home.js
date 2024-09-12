import React from 'react';
import './Home.css';
import Intro from './homeSections/Intro';
import Company from './homeSections/Company';
import AboutSection from './homeSections/AboutSection';
import ServiceList from './homeSections/ServiceList';


const Home = () => {
  console.log('Home');
  return (
    <div>
      <Intro />
      <Company />
      <AboutSection />
      <ServiceList />
    </div>
  );
}

export default Home;
