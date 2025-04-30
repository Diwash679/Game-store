let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, image) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price, image });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCartPreview();
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
  
  cartContainer.innerHTML = '';  // clear current cart display
  cartItems.forEach(item => {
    total += item.price;

    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">  <!-- Image shown here -->
      <div class="cart-item-details">
        <p><strong>${item.name}</strong></p>
        <p>$${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${cartItems.indexOf(item)})">Remove</button>  <!-- Add remove button -->
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

  previewContainer.innerHTML = ''; // clear previous preview items

  let total = 0;
  cartItems.slice(0, 5).forEach(item => {  // Show only the first 5 items for preview
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

