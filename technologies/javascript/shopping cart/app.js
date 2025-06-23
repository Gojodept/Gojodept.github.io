let cart = {};

const products = [
  { id: 1, name: "Product 1", price: 25 },
  { id: 2, name: "Product 2", price: 50 },
  { id: 3, name: "Product 3", price: 75 },
];

// Render Product List with Buttons
const showProducts = () => {
  let r = document.getElementById("root");
  r.innerHTML = ""; // Clear previous

  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${product.name}</strong> - ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="increment(${product.id})">+</button>
      <button onclick="decrement(${product.id})">−</button>
      <hr>
    `;
    r.appendChild(div);
  });
};

// Add to Cart
function addToCart(id) {
  cart = { ...cart, [id]: cart[id] ? cart[id] + 1 : 1 };
  renderCart();
}

// Increment Quantity
function increment(id) {
  if (cart[id]) {
    cart[id]++;
  } else {
    cart[id] = 1;
  }
  renderCart();
}

// Decrement Quantity
function decrement(id) {
  if (cart[id] > 1) {
    cart[id]--;
  } else {
    delete cart[id];
  }
  renderCart();
}

// Render Cart Display
function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "<h3>Cart Items</h3>";
  let total = 0;

  products.forEach((product) => {
    if (cart[product.id]) {
      const quantity = cart[product.id];
      const price = quantity * product.price;
      total += price;

      const item = document.createElement("p");
      item.innerHTML = `${product.name} - ₹${product.price} × ${quantity} = ₹${price}`;
      cartDiv.appendChild(item);
    }
  });

  document.getElementById("total").innerText = `Total: ₹${total}`;
}

// Initial Render
showProducts();
renderCart();
