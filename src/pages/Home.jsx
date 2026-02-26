import React from 'react';
import Hero from '../components/Hero';

import ProductGrid from '../components/ProductGrid';
import Features from '../components/Features';



const Home = ({ addToCart }) => {
  return (
    <div>
      <Hero />
      
      <ProductGrid addToCart={addToCart} />
      <Features />
      
     
    </div>
  );
};

export default Home;