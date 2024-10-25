function showPropertyDetails(propertyId) {
    const property = properties.find(prop => prop.id === propertyId);
    if (property) {
      const detailView = document.createElement('div');
      detailView.className = 'property-detail';
      detailView.innerHTML = `
        <h2>${property.type.charAt(0).toUpperCase() + property.type.slice(1)} in ${property.location}</h2>
        <p>Price: $${property.price.toLocaleString()}</p>
        <p>Additional information about the property...</p>
        <button onclick="showContactForm()">Contact Agent</button>
      `;
      document.body.appendChild(detailView);
    }
  }
  
  function showContactForm() {
    const contactForm = document.createElement('div');
    contactForm.className = 'contact-form';
    contactForm.innerHTML = `
      <h3>Contact Agent</h3>
      <label>Name: <input type="text" id="contactName"></label>
      <label>Email: <input type="email" id="contactEmail"></label>
      <label>Message: <textarea id="contactMessage"></textarea></label>
      <button onclick="submitContactForm()">Send Message</button>
    `;
    document.body.appendChild(contactForm);
  }
  
  function submitContactForm() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
  
    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent.`);
      document.querySelector('.contact-form').remove(); // Remove form after submission
    } else {
      alert('Please fill out all fields.');
    }
  }
  