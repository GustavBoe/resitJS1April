const apiURL = "https://v2.api.noroff.dev/gamehub";
let chosenProduct = [];
let cart = JSON.parse(localStorage.getItem("cart-data")) || [];
const parameterString = window.location.search;
const searchParameters = new URLSearchParams(parameterString);

for (const parameter of searchParameters) {
  const productApi = apiURL + "/" + parameter[1];
  try {
    const response = await fetch(productApi);
    const json = await response.json();
    chosenProduct = await json.data;
  } catch (error) {
    console.log("Something went wrong", error);
  } finally {
  }
}
function removeProductFromCart(id) {
  let selectedProduct = chosenProduct.id;
  let search = cart.find((x) => x.id === selectedProduct);

  if (search.item === 0) return;
  else {
    search.item -= 1;
    console.log(search);
  }
}

function addProductToCart(id) {
  let selectedProduct = chosenProduct.id;

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
}

let update = (id) => {
  let selectedProduct = chosenProduct.id;

  let search = cart.find((x) => x.id === selectedProduct) || [];

  if (search.item === undefined) {
    document.getElementById("header-cart-counter").innerHTML = 0;
  } else {
    document.getElementById("header-cart-counter").innerHTML = search.item;
  }
  localStorage.setItem("cart-data", JSON.stringify(cart));
};

const displayChosenContainer = document.getElementById(
  "display-chosen-container"
);

function generateChosenProductHtml(product) {
  const chosenProductContainer = document.createElement("div");
  chosenProductContainer.classList.add("chosen-product-container");

  const productTitle = document.createElement("h2");

  productTitle.textContent = chosenProduct.title;

  const productImage = document.createElement("img");
  productImage.src = chosenProduct.image.url;
  productImage.alt = chosenProduct.image.alt;

  const productDescription = document.createElement("p");
  productDescription.textContent = chosenProduct.description;

  const productPrice = document.createElement("h2");
  if (!chosenProduct.onSale) {
    productPrice.textContent = "$" + " " + chosenProduct.price;
  } else {
    productPrice.textContent = "$" + " " + chosenProduct.discountedPrice;
  }
  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to cart";
  addToCartButton.addEventListener("click", () => {
    addProductToCart(chosenProduct);
  });

  chosenProductContainer.append(
    productTitle,
    productImage,
    productDescription,
    productPrice,
    addToCartButton
  );

  return chosenProductContainer;
}

async function displayChosenProduct(data) {
  const ChosenproductHtml = await generateChosenProductHtml();
  displayChosenContainer.append(ChosenproductHtml);
}
async function main() {
  await displayChosenProduct(chosenProduct);
  await update(chosenProduct);
}
main();
