const apiURL = "https://v2.api.noroff.dev/gamehub";
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
const displayContainer = document.getElementById("display-container");

function generateProductHtml(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product-container");

  const productTitle = document.createElement("h2");

  productTitle.textContent = allProducts[product].title;

  const productImage = document.createElement("img");
  productImage.src = allProducts[product].image.url;
  productImage.alt = allProducts[product].image.alt;

  const productPrice = document.createElement("h2");
  if (!allProducts[product].onSale) {
    productPrice.textContent = "$" + " " + allProducts[product].price;
  } else {
    productPrice.textContent = "$" + " " + allProducts[product].discountedPrice;
  }

  const productLink = document.createElement("a");
  productLink.href = `./product/index.html?id=${allProducts[product].id}`; /* Code borrowed from Tonje Schjefstad´s "bestsellers.js"*/
  productLink.classList.add("product-link-button");
  productLink.innerHTML = "<button>View</button>";

  async function addButtonClick() {
    try {
      await cartList.push(allProducts[product]);
      localStorage.setItem("cartList", JSON.stringify(cartList));
      console.log(localStorage.getItem("cartList"));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  function removeButtonClick() {
    cartList.pop(allProducts[product]);
    console.log(cartList);
  }
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const removeButton = document.createElement("button");
  removeButton.textContent = "-";
  removeButton.addEventListener("click", removeButtonClick);

  const addButton = document.createElement("button");
  addButton.textContent = "+";
  addButton.addEventListener("click", addButtonClick);

  buttonContainer.append(removeButton, addButton);
  productContainer.append(
    productTitle,
    productImage,
    productPrice,
    productLink,
    buttonContainer
  );

  return productContainer;
}

async function displayProducts(data) {
  for (let i = 0; i < data.length; i++) {
    const productHtml = await generateProductHtml(i);
    await displayContainer.append(productHtml);
  }
}

async function main() {
  showLoader();
  try {
    calculation();
    await getProducts(apiURL);
    await displayProducts(allProducts);
  } catch (error) {
    alert(error);
  } finally {
    hideLoader();
  }
}

main();
