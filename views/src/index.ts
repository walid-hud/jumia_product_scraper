import gsap from "gsap";
import type { Products, Product } from "./types";
import json from "./data";
type State = { products: Product[]; current_page: number, last_page?:number };
const state: State = {
    products: [],
    current_page: 1,
};
const base_url = "http://localhost:3000/products";
// render logic
const $ = <T extends Element>(selector: string) =>
    document.querySelector<T>(selector);
const form = $<HTMLFormElement>("form")!;
const input = $<HTMLInputElement>("input")!;
const results_container = $<HTMLElement>(".results-container")!;
const skeleton_template = $<HTMLTemplateElement>(".skeleton-template")!;

// UI logic
const time_line = gsap.timeline();
function animate_form() {
    return gsap.to(form, {
        transform: "translateY(0)",
        margin: 0,
        top: 0,
        delay: 0.2,
        ease: "power2",
        duration: 0.8,
    });
}

function show_skeleton(){
  Array.from({ length: 40 }).map(() => { // because my api returns 40 product (most of the time)
        results_container.appendChild(
            skeleton_template.content.cloneNode(true)
        );
    });
}

function remove_skeleton(){
  document
  .querySelectorAll(".product-card-skeleton")
  .forEach((el) => el.remove());
}
function show_results_container() {
    return gsap.to(results_container, {
        opacity: 1,
        ease: "power1.inOut",
        duration: 0.4,
    });
}
time_line.add(animate_form()).add(show_results_container()).pause();

// data logic
// const get_mock_data = async (): Promise<Product[]> => {
//     const data = JSON.parse(json) as Products;
//     await sleep(10000);
//     return data.products.products;
// };


function sleep(ms: number) {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}

const submit_handler = async (e: Event) => {
    e.preventDefault();
    time_line.play();
    input.blur();
    input.disabled = true;
    show_skeleton()
    const data = await fetch_products(input.value) as any
    if(data.products){
      const {products} = data as Products
      state.current_page = products.current_page
      state.last_page = products.last_page
      update_product_container(products.products)
    }else if(data.type){
      const error = data as fetch_error
      alert(error.type + error.message )
    }
    remove_skeleton()
    input.disabled = false
  };

form.addEventListener("submit", submit_handler);

type fetch_error = {
    type: "server" | "request" | "unknown";
    message: string;
};
async function fetch_products(qeury: string): Promise<Products | fetch_error> {
    try {
        const url = new URL(base_url)
        url.searchParams.set("query" , qeury)
        url.searchParams.set("page" , state.current_page.toString())
        const res = await fetch(url);
        if (res.status === 400) {
            return { type: "request", message: "invalid search" };
        }
        if (res.status === 404) {
            return {
                type: "request",
                message: "no products found for this search",
            };
        }
        if (res.status === 500) {
            return { type: "server", message: "server error" };
        }
        const data = await res.json();
        return data as Products;
        
    } catch (error) {
        console.error(error);
        return { type: "unknown", message: "something went wrong" };
    }
}

function generate_product_card({
    brand,
    category,
    image,
    name,
    price,
    url,
}: Product) {
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

function update_product_container(products: Product[]) {
    products
        .map(generate_product_card)
        .map((e) => results_container.appendChild(e));
}
