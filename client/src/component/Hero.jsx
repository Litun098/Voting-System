import React from 'react';
import '../styles/hero.css';
import voteImage from '../images/pexels-element-digital-1550337.jpg'

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Vote for your favorite</h1>
        <p className="hero-description">Make your voice heard and cast your vote. Choose from variety.</p>
        <a href="#poll" className="hero-cta">Vote Now</a>
      </div>
      <div className="hero-image">
        <img src={voteImage} alt="Image" />
      </div>
    </div>
  );
}

export default Hero;
