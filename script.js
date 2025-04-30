console.log("Full cart contents:", JSON.parse(localStorage.getItem('cart')));
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    if (document.getElementById('cart-items')) {
        console.log("Cart container found");
    }
});





let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingItemIndex = cart.findIndex(item => item.name === name);
  
  if (existingItemIndex !== -1) {

    const warningElement = document.getElementById(`warning-${name.replace(/\s+/g, '-')}`);
    if (warningElement) {
      warningElement.textContent = '⚠️ Already in cart!';
      setTimeout(() => warningElement.textContent = '', 2000);
    }
    return;
  }

  cart.push({ 
    name: name, 
    price: price, 
    image: image 
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  
  updateCartCount();
  loadCartPreview();
  
  const confirmationElement = document.getElementById(`warning-${name.replace(/\s+/g, '-')}`);
  if (confirmationElement) {
    confirmationElement.textContent = '✅ Added to cart!';
    setTimeout(() => confirmationElement.textContent = '', 2000);
  }
  
  console.log("Cart after adding:", cart); // Debug line
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = cart.length;
  });
}


function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  
  console.log("Attempting to load cart items:", cartItems); // Debug line
  
  // Clear previous items
  cartContainer.innerHTML = '';
  
  // If cart is empty
  if (cartItems.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      document.getElementById('total').textContent = '0.00';
      return;
  }
  
  // Display each item
  let total = 0;
  cartItems.forEach((item, index) => {
      total += item.price;
      
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
              <h4>${item.name}</h4>
              <p>$${item.price.toFixed(2)}</p>
              <button onclick="removeFromCart(${index})">Remove</button>
          </div>
      `;
      cartContainer.appendChild(itemElement);
  });
  
  // Update total
  document.getElementById('total').textContent = total.toFixed(2);
}

function loadCartPreview() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const previewContainer = document.getElementById('cart-preview-items');
  const totalElement = document.getElementById('cart-preview-total');

  previewContainer.innerHTML = '';

  let total = 0;
  cartItems.slice(0, 5).forEach(item => {
    total += item.price;
    const previewItem = document.createElement('div');
    previewItem.className = 'cart-preview-item';
    previewItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-preview-item-image">
      <p>${item.name}</p>
      <p>$${item.price.toFixed(2)}</p>
    `;
    previewContainer.appendChild(previewItem);
  });

  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  if (window.location.pathname.includes('cart.html')) {
      loadCart();
  }
});


function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate cart isn't empty
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const formData = {
    customer: {
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value
    },
    payment: {
      cardname: document.getElementById('cardname').value,
      cardnumber: document.getElementById('cardnumber').value,
      expiry: document.getElementById('expiry').value,
      cvv: document.getElementById('cvv').value
    },
    cart: cartItems,
    total: parseFloat(document.getElementById('total').textContent)
  };

  console.log('Order submitted:', formData);
  
  alert(`Order confirmed! Thank you, ${formData.customer.firstname}.`);
  
  localStorage.setItem('cart', JSON.stringify([]));
  updateCartCount();
  loadCart();
});

