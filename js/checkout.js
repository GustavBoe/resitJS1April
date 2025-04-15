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
      <img width="160" src=${search.image.url} alt="" />
        <div class = "cart-product-details">

          <div class = "title-price-del">
          <h2 class = "title-price">
          <p>${search.title}</p>
          <p class= "cart-product-price">$ ${search.discountedPrice}</p>
          </h2>
          <i class="fa-solid fa-xmark"></i>
          </div>
          <div class = "cart-product-buttons">
          <i onclick = "removeProductFromCart(${id})"class="fa-sharp fa-solid fa-minus"></i>
          <div id=${id} class= "quantity">
          ${item}</div>
          <i onclick=" addProductToCart(${id})" class="fa-sharp fa-solid fa-plus"></i>
          </div>
          

          <h3>$ ${item * search.price}</h3>

        </div>
      </div>
      `;
        } else {
          return `
      <div class= "cart-product"> 
      <img width = "160" src=${search.image.url} alt="" />
        <div class = "cart-product-details">

          <div class = "title-price-del">
          <h2 class = title-price">
          <p>${search.title}</p>
          <p class= "cart-product-price">$ ${search.price}</p>
          </h2>
          <i class="fa-solid fa-xmark"></i>
          </div>

          <div class = "cart-product-buttons">
          <i onclick = "removeProductFromCart(${id})"class="fa-sharp fa-solid fa-minus"></i>
          <div id=${id} class= "quantity">
          ${item}</div>
          <i onclick=" addProductToCart(${id})" class="fa-sharp fa-solid fa-plus"></i>
          </div>

          <h3></h3>

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
async function main() {
  await getProducts(apiURL);
  await generateCartProducts();
}
main();

let removeProductFromCart = (id) => {
  let selectedProduct = allProducts[product].id;
  let search = cart.find((x) => x.id === selectedProduct);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
    console.log(search);
  }
  update(selectedProduct);
  cart = cart.filter((x) => x.item !== 0);
  localStorage.setItem("cart-data", JSON.stringify(cart));
};

let addProductToCart = (id) => {
  let selectedProduct = search.id;

  let search = cart.find((x) => x.id === selectedProduct);

  if (search === undefined) {
    cart.push({
      id: selectedProduct,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedProduct);
  cart = cart.filter((x) => x.item !== 0);
};

let update = (id) => {
  let selectedProduct = chosenProduct.id;

  let search = cart.find((x) => x.id === selectedProduct) || [];

  if (search.item === undefined) {
    document.getElementById("header-cart-counter").innerHTML = 0;
  } else {
    document.getElementById("header-cart-counter").innerHTML = search.item;
  }
  calculation();
  localStorage.setItem("cart-data", JSON.stringify(cart));
};
