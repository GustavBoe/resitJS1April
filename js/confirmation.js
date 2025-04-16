let cart = JSON.parse(localStorage.getItem("cart-data")) || [];

let calculation = () => {
  let cartCounter = document.getElementById("header-cart-counter");
  cartCounter.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
