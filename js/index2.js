let shop = document.getElementById("shop");
let cart = JSON.parse(localStorage.getItem("cart-data")) || [];

let generateShop = () => {
  return (shop.innerHTML = `
  <div class="product">
        <img src="" alt="" />
        <div class="shop-product-details">
          <h3></h3>
          <p></p>
          <div class="price-quantity">
            <h2>$Price</h2>
            <div class="buttons">
              <i class="fa-sharp fa-solid fa-minus"></i>
              <div class="quantity">0</div>
              <i class="fa-sharp fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </div>`);
};

generateShop();
