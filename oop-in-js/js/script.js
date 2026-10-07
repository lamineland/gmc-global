import { Product, ShoppingCart } from './object.js';

// --- DOM elements ---
const listProducts = document.querySelector('.list-products');
const totalElement = document.querySelector('.total');

// --- Cart model (all cart logic lives in the ShoppingCart class) ---
const cart = new ShoppingCart();

const cartItemsByElement = new Map();

/** Source of unique product ids. */
let nextProductId = 1;

/** Find the product card that owns the clicked icon. */
function getProductItem(element) {
  return element.closest('.list-products > .card-body');
}

/** Return the quantity of a product as shown in the DOM. */
function getQuantity(productItem) {
  return parseInt(productItem.querySelector('.quantity').textContent, 10) || 0;
}

/** Return the unit price of a product as a number ("100 $" -> 100). */
function getUnitPrice(productItem) {
  return parseFloat(productItem.querySelector('.unit-price').textContent) || 0;
}

/** Write a quantity back to the DOM (clamped at 0). */
function setQuantity(productItem, value) {
  productItem.querySelector('.quantity').textContent = Math.max(0, value);
}

/** Create a Product from the data rendered in a product card. */
function createProduct(productItem) {
  return new Product(
    nextProductId++,
    productItem.querySelector('.card-title').textContent.trim(),
    getUnitPrice(productItem)
  );
}

/**
 * Add a product to the cart and return the ShoppingCartItem instance
 * stored inside the cart (ShoppingCart.addItem merges lines by product id).
 */
function addProductToCart(product, quantity) {
  cart.addItem(product, quantity);
  return cart.items.find(item => item.product.id === product.id);
}


function changeQuantity(cartItem, productItem, delta) {
  cartItem.quantity = Math.max(0, cartItem.quantity + delta);
  setQuantity(productItem, cartItem.quantity);
}

/** Refresh the total price display from the cart model. */
function updateTotalPrice() {
  totalElement.textContent = cart.getTotalPrice() + ' $';
}

// --- Build the cart model from the products rendered in the page ---
document.querySelectorAll('.list-products > .card-body').forEach(function (productItem) {
  const cartItem = addProductToCart(createProduct(productItem), getQuantity(productItem));
  cartItemsByElement.set(productItem, cartItem);
});

// --- Events ---
listProducts.addEventListener('click', function (event) {
  const clicked = event.target;
  const productItem = getProductItem(clicked);

  if (!productItem) return;

  let cartItem = cartItemsByElement.get(productItem);

  if (clicked.classList.contains('fa-plus-circle')) {
    // Task 1: "+" increases the quantity
    if (!cartItem) {
      // Line was removed from the cart model earlier: recreate it with quantity 0.
      cartItem = addProductToCart(createProduct(productItem), 0);
      cartItemsByElement.set(productItem, cartItem);
    }
    changeQuantity(cartItem, productItem, 1);
  } else if (clicked.classList.contains('fa-minus-circle')) {
    // Task 1: "-" decreases the quantity (never below 0)
    if (cartItem) {
      changeQuantity(cartItem, productItem, -1);
    }
  } else if (clicked.classList.contains('fa-trash-alt')) {
    // Task 2: delete the item from the cart
    if (cartItem) {
      cart.removeItem(cartItem.product.id);
      cartItemsByElement.delete(productItem);
    }
    productItem.remove();
  } else if (clicked.classList.contains('fa-heart')) {
    // Task 3: toggle the like state (color changes via CSS .fa-heart.liked)
    clicked.classList.toggle('liked');
  } else {
    return;
  }

  // Task 4: adjust the total price (quantity changes and deletions)
  updateTotalPrice();
});

// Show the correct total on page load.
updateTotalPrice();
