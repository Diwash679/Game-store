let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, image) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
  
    const warningElement = document.getElementById(`warning-${name.replace(/\s+/g, '-')}`);
    if (warningElement) {
      warningElement.textContent = '⚠️ Already in cart!';
      setTimeout(() => warningElement.textContent = '', 2000); 
    }
    return; 
  }

  cart.push({ name, price, image });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCartPreview();

  const confirmationElement = document.getElementById(`warning-${name.replace(/\s+/g, '-')}`);
  if (confirmationElement) {
    confirmationElement.textContent = '✅ Added to cart!';
    setTimeout(() => confirmationElement.textContent = '', 2000);
  }
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
  const totalElement = document.getElementById('total');

  let total = 0;
  cartContainer.innerHTML = '';

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

  totalElement.textContent = total.toFixed(2);
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




function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function checkout() {
  alert('Thank you for your purchase! (Simulated Checkout)');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (document.getElementById('cart-items')) {
    loadCart();
  }
});

