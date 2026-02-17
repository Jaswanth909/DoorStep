// Sample products data
const products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
  { id: 2, name: 'Headphones', price: 79.99, category: 'Electronics' },
  { id: 3, name: 'Keyboard', price: 49.99, category: 'Electronics' },
  { id: 4, name: 'Mouse', price: 29.99, category: 'Electronics' },
  { id: 5, name: 'Monitor', price: 299.99, category: 'Electronics' },
  { id: 6, name: 'Desk Lamp', price: 39.99, category: 'Home' }
];

// Shopping cart array
let cart = [];

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
  loadCart();
});

// Load products on page
function loadProducts() {
  const productGrid = document.getElementById('product-grid');
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <div class="product-image">📦</div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(productCard);
  });
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartCount();
  saveCart();
  showNotification(`${product.name} added to cart!`);
}

// Update cart count display
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('doorstep_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('doorstep_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Show notification
function showNotification(message) {
  alert(message);
}

// Search products
function searchProducts(keyword) {
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(keyword.toLowerCase()) ||
    p.category.toLowerCase().includes(keyword.toLowerCase())
  );
  return filtered;
}

// Filter by category
function filterByCategory(category) {
  return products.filter(p => p.category === category);
}

// Get cart total
function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Clear cart
function clearCart() {
  cart = [];
  updateCartCount();
  saveCart();
}
