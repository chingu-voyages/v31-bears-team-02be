import * as React from 'react';
import Features from '../Features/Features';
import Hero from '../Hero/Hero';
import HowTo from '../HowTo';

const HomePage = () => (
  <article className="home">
    <Hero />
    <Features />
    <HowTo />
  </article>
);

export default HomePage;
