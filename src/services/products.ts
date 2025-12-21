import * as cheerio from "cheerio";
import { fetch_page, jumia } from "../utils/index.ts";
const get_products_data = async (query: string): Promise<object[]> => {
  const products: object[] = [];
  const url =
    jumia.search_url + jumia.search_prefix + encodeURIComponent(query);
  const page = await fetch_page(url);
  const $ = cheerio.load(page);
  $(jumia.product).each((idx, product) => {
    products.push( {
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
