
let cart = {};

const products = [
  { id: 1, name: "Product 1", price: 25 },
  { id: 2, name: "Product 2", price: 50 },
  { id: 3, name: "Product 3", price: 75 },
];

// Show Products Page
const showProducts = () => {
  let str = "<div class='row'>";
  products.forEach((value) => {
    str += `
      <div>
        <h3>${value.name}</h3>
        <h4>$${value.price}</h4>
        <button onclick='addToCart(${value.id})'>Add to Cart</button>
      </div>
    `;
  });
  str += "</div>";

  document.getElementById("root").innerHTML = str;
};

// Add to cart
function addToCart(id) {
  cart = { ...cart, [id]: (cart[id] ?? 0) + 1 };
  showCart(); // update view after adding
}

// Increment
function increment(id) {
  cart[id]++;
  showCart();
}

// Decrement
function decrement(id) {
  if (cart[id] > 1) {
    cart[id]--;
  } else {
    delete cart[id]; // remove item if quantity is 0
  }
  showCart();
}

// Show Cart Page
function showCart() {
  let str = "<ul>";
  products.forEach((value) => {
    if (cart[value.id] > 0) {
      str += `
        <li>
          ${value.name} - $${value.price}
          <button onclick="decrement(${value.id})">−</button>
          ${cart[value.id]}
          <button onclick="increment(${value.id})">+</button>
          = $${value.price * cart[value.id]}
        </li>
      `;
    }
  });
  str += "</ul>";

  const total = products.reduce((sum, value) => {
    return sum + value.price * (cart[value.id] ?? 0);
  }, 0);

  str += `<h3>Total: $${total}</h3>`;
  document.getElementById("root").innerHTML = str;
}
