// Sample data for properties
const properties = [
    { id: 1, type: 'apartment', location: 'New York', price: 500000 },
    { id: 2, type: 'house', location: 'Los Angeles', price: 750000 },
    { id: 3, type: 'apartment', location: 'Chicago', price: 450000 },
    { id: 4, type: 'house', location: 'Houston', price: 600000 },
    { id: 5, type: 'apartment', location: 'Phoenix', price: 350000 },
  ];
  
  // Function to display properties
  function displayProperties(properties) {
    const propertyList = document.getElementById('propertyList');
    propertyList.innerHTML = '';
    properties.forEach(property => {
      const propertyItem = document.createElement('div');
      propertyItem.className = 'property-item';
      propertyItem.innerHTML = `
        <h2>${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</h2>
        <p>Location: ${property.location}</p>
        <p>Price: $${property.price.toLocaleString()}</p>
      `;
      propertyList.appendChild(propertyItem);
    });
  }
  
  // Function to filter properties based on criteria
  function filterProperties() {
    const type = document.getElementById('propertyType').value;
    const location = document.getElementById('location').value.toLowerCase();
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
  
    const filteredProperties = properties.filter(property => {
      return (!type || property.type === type) &&
             (!location || property.location.toLowerCase().includes(location)) &&
             (!minPrice || property.price >= minPrice) &&
             (!maxPrice || property.price <= maxPrice);
    });
  
    displayProperties(filteredProperties);
  }
  
  // Initial display of all properties
  displayProperties(properties);
  