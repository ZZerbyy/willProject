import React from 'react';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-container">
      <Navigation />
      <div className="contact-section p-4">
        <h1 className="text-center mb-4">Contact Us</h1>
        <p className="text-center">We'd love to hear from you! Please fill out the form below.</p>
        <form className="contact-form">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Your Email" />
          </div>
          <div className="form-group">
            <textarea className="form-control" placeholder="Your Message" rows="4"></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
