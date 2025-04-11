function createCartHtml() {
  const displayCartContainer = document.getElementById(
    "display-cart-container"
  );

  function generateCartHtml(product) {
    let cart = JSON.parse(localStorage.getItem("cart") || []);
    const productContainer = document.createElement("div");
    productContainer.classList.add("cart-product-container");

    const productTitle = document.createElement("h2");

    productTitle.textContent = cart[product].title;

    const productImage = document.createElement("img");
    productImage.src = cart[product].image.url;
    productImage.alt = cart[product].image.alt;

    const productPrice = document.createElement("h2");
    if (!cart[product].onSale) {
      productPrice.textContent = "$" + " " + cart[product].price;
    } else {
      productPrice.textContent = "$" + " " + cart[product].discountedPrice;
    }

    productContainer.append(productTitle, productImage, productPrice);

    return productContainer;
  }
}
