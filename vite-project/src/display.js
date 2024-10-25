// Function to display properties (updated with event listener for details)
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
        <button onclick="showPropertyDetails(${property.id})">View Details</button>
      `;
      propertyList.appendChild(propertyItem);
    });
  }
  