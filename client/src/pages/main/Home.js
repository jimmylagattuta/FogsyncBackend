import React from 'react';
import './Home.css';
import Intro from './homeSections/Intro';
import Company from './homeSections/Company';


const Home = () => {
  console.log('Home');
  return (
    <div>
      <Intro />
      <Company />
    </div>
  );
}

export default Home;
