const apiURL = "https://v2.api.noroff.dev/gamehub";
let checkoutTotal = document.getElementById("checkout-total");
let checkoutCart = document.getElementById("checkout-cart");
let cart = JSON.parse(localStorage.getItem("cart-data")) || [];
let allProducts = [];

async function getProducts(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    allProducts = await json.data;
  } catch (error) {
    console.log("Something went wrong");
  } finally {
  }
}
function showLoader() {
  const loader = document.querySelector(".loader");
  loader.hidden = false;
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  loader.hidden = true;
}
let calculation = () => {
  let cartCounter = document.getElementById("header-cart-counter");
  cartCounter.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartProducts = () => {
  if (cart.length !== 0) {
    return (checkoutCart.innerHTML = cart
      .map((x) => {
        let { id, item } = x;
        let search = allProducts.find((y) => y.id === id) || [];
        if (!search.onSale) {
          return `
        <div class= "cart-product"> 
        <img width = "160" src=${search.image.url} alt="" />
          <div class = "cart-product-details">
  
            <div class = "title-price-del">
            <h2 class = title-price">
            <p>${search.title}</p>
            <p class= "cart-product-price">$ ${search.price}</p>
            
            </h2>
            </div>
            <div class = "cart-product-quantity">
            <div id=${id} class= "quantity">
            Quantity: ${item}</div>
            </div>
            <h3></h3>
          </div>
        </div>
        `;
        } else {
          return `
      <div class= "cart-product"> 
      <img width="160" src=${search.image.url} alt="" />
        <div class = "cart-product-details">

          <div class = "title-price-del">
          <h2 class = "title-price">
          <p>${search.title}</p>
          <p class= "cart-product-price">$ ${search.discountedPrice}</p>
          </h2>
          </div>
          <div class = "cart-product-quantity">
          <div id=${id} class= "quantity">
          Quantity: ${item}</div>
          </div>
          <h3>$ ${item * search.discountedPrice}</h3>
        </div>
      </div>
      `;
        }
      })
      .join(""));
  } else {
    checkoutCart.innerHTML = ``;
    checkoutTotal.innerHTML = `
    <h2>No products in cart</h2>
    <a href="../index.html">
    <button class="homeButton">Back to home </button></a>`;
  }
};
let totalSum = () => {
  if (cart.length !== 0) {
    let amount = cart
      .map((x) => {
        let { item, id } = x;
        let search = allProducts.find((y) => y.id === id) || [];
        if (!search.onSale) {
          return item * search.price;
        } else {
          return item * search.discountedPrice;
        }
      })
      .reduce((x, y) => x + y, 0);
    checkoutTotal.innerHTML = `<button onclick="clearEntireCart()" class="clearEntireButton">Clear cart</button> <h2>Total sum: $ ${amount}</h2>`;
  } else return;
};

let clearEntireCart = () => {
  cart = [];
  generateCartProducts();
  calculation();
  localStorage.setItem("cart-data", JSON.stringify(cart));
};
async function main() {
  showLoader();
  try {
    await getProducts(apiURL);
    await generateCartProducts(cart);
    totalSum();
  } catch (error) {
    alert(error);
  } finally {
    hideLoader();
  }
}
main();
