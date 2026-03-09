import React from 'react';
import Hero from '../Components/Hero';

import ProductGrid from '../Components/ProductGrid';
import Features from '../Components/Features';



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