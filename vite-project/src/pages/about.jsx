import React from 'react';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/About.css';

const About = () => {
    return ( 
        <div className="about-container">
        <Navigation />
        <h1>About Us</h1> 
        <p> At Rent-A-Buy Real Estate, we believe that everyone deserves a place to call home, 
        no matter where life’s journey takes them. Our mission is to make living affordable and accessible for everyone. 
        We understand the importance of being close to family, work, and the places that matter most, 
        and we are dedicated to helping people find homes that fit their lives perfectly. </p> 
        <p> Our vision is to create a world where geographical boundaries never limit opportunities. 
        Whether you’re relocating for a new job, seeking a fresh start, or just looking for a change of scenery, 
        we are here to make the transition seamless and stress-free. We strive to offer a diverse range of properties, 
        catering to all needs and budgets, ensuring that everyone can find a place they are proud to call home. </p> 
        <p> At Rent-A-Buy Real Estate, we prioritize transparency, affordability, and customer satisfaction. 
        Our team is committed to providing exceptional service, guiding you every step of the way, 
        and ensuring that you find the perfect home that meets all your needs. </p> 
        <p> Join us on this journey to make the dream of living wherever you need to be a reality. 
        Because at Rent-A-Buy Real Estate, your new home is not just an address—it’s where your life begins. </p>
        <Footer />
      </div> 
      ); 
    }; 
          
    export default About;