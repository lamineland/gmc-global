

const listProducts = document.querySelector('.list-products');
const totalElement = document.querySelector('.total');

/** Find the product wrapper that owns the clicked icon. */
function getProductItem(element) {
  return element.closest('.list-products > .card-body');
}

/** Return the quantity of a product as a number. */
function getQuantity(productItem) {
  return parseInt(productItem.querySelector('.quantity').textContent, 10) || 0;
}

/** Return the unit price of a product as a number ("100 $" -> 100). */
function getUnitPrice(productItem) {
  return parseFloat(productItem.querySelector('.unit-price').textContent) || 0;
}

/** Set a new quantity on a product (clamped at 0). */
function setQuantity(productItem, value) {
  productItem.querySelector('.quantity').textContent = Math.max(0, value);
}


function updateTotalPrice() {
  let total = 0;

  document.querySelectorAll('.list-products > .card-body').forEach(function (productItem) {
    total += getUnitPrice(productItem) * getQuantity(productItem);
  });

  totalElement.textContent = total + ' $';
}


listProducts.addEventListener('click', function (event) {
  const clicked = event.target;
  const productItem = getProductItem(clicked);

  if (!productItem) return;

  if (clicked.classList.contains('fa-plus-circle')) {
    // Task 1: "+" increases the quantity
    setQuantity(productItem, getQuantity(productItem) + 1);
  } else if (clicked.classList.contains('fa-minus-circle')) {
    // Task 1: "-" decreases the quantity (never below 0)
    setQuantity(productItem, getQuantity(productItem) - 1);
  } else if (clicked.classList.contains('fa-trash-alt')) {
    // Task 2: delete the item from the cart
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