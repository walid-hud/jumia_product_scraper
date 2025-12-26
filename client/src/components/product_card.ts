import type { JUMIA_PRODUCT } from "@shared/types";
function generate_product_card({
    brand,
    category,
    image,
    name,
    price,
    url
}: JUMIA_PRODUCT) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
          <a href="https://jumia.ma${url}"  target="_blank">
            <img src="${image}" height="250px" width="100%" alt="${name}">
            <div class="product-info">
              <p class="title">
                ${name}
              </p>
              <p class="price">${price}</p>
              <div class="brand">${brand}</div>
              <div class="categories">
              ${category?.split(" ").map((cat) => `<span>${cat}</span>`)}
              </div>
            </div>
            <div class="prd-action-container">
              <div class="prd-action">
              <p>
              visit product page
              </p>
              <span>
              </span>
            </div>
            </div>
          
          </a>`;
    return card;
}

export default generate_product_card