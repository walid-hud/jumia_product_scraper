import * as cheerio from "cheerio";
import { fetch_page, jumia } from "../utils/index.ts";
import { log } from "node:console";
type Product = {
  name: string;
  url: string | undefined;
  image: string | undefined;
  price: string;
  brand: string | undefined;
  category: string | undefined;
};
type Products = {current_page: number, last_page: number, products: Product[]};
const get_products_data = async (query: string , page_number : number): Promise<Products> => {
  const products = {} as Products;
  const url = new URL(jumia.search_url)
  url.searchParams.set(jumia.search_prefix , query)
  url.searchParams.set(jumia.page_prefix , String(page_number))
  log(url.toString())
  const page = await fetch_page(
    // url.toString()
    "http://localhost:3000/test_page.html"
  );
  if(!page)return products;
  const $ = cheerio.load(page);
  const last_page_number = $(jumia.last_page_label).attr("href")?.replace(/[^0-9]/g, '');
  products.current_page = page_number;
  products.last_page = last_page_number ? Number(last_page_number) : page_number;
  if(products.last_page < products.current_page){
    return products;
  }
  products.products = [];
  $(jumia.product).each((idx, product) => {
    products.products.push( {
      name: $(product).find(jumia.product_name).text().trim(),
      url: $(product).find(jumia.product_url).attr("href"),
      image:
        $(product).find(jumia.product_image).attr("data-src") ||
        $(product).find(jumia.product_image).attr("src"),
      price: $(product).find(jumia.price).text().trim(),
      brand: $(product).find(jumia.brand).attr("data-gtm-brand"),
      category: $(product).find(jumia.category)
        .attr("data-gtm-category"),
    })
  });
  return products;
};
export default get_products_data;
