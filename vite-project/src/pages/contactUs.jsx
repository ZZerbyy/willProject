import React from 'react';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-container">
      <Navigation />
      <h1>Contact Us</h1>
      <p>Get in touch for more information.</p>
      <Footer />
    </div>
  );
}

export default ContactUs;