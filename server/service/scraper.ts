import type { APP_ERROR, JUMIA_PRODUCT } from "../../shared/types.ts";
import * as cheerio from "cheerio";
import { log } from "./logger.ts";
import { fetch_page } from "../../shared/utils/fetch.ts";
class JUMIA {
    constructor() {}
    base_url = "https://www.jumia.ma/catalog/";
    search_page = new URL(this.base_url);
    product = "article.prd";
    search_prefix = "q";
    page_prefix = "page";
    last_page_label = `[aria-label="Dernière page"]`;
    product_link = "a.core";
    product_url = "a.core";
    product_name = "h3.name";
    product_image = ".img-c img";
    product_image_alt = ".img-c img";
    price = ".prc";
    brand = "a.core";
    category = "a.core";
    async get_products(
        query: string,
        page: number = 1
    ): Promise<JUMIA_PRODUCT[] | APP_ERROR> {
        const url = new URL(this.search_page);
        url.searchParams.set(this.search_prefix, query);
        url.searchParams.set(this.page_prefix, page.toString());
        await log("debug", "[FETCH] " + url.toString());
        const response = await fetch_page(url.toString(), {
            headers: {
                "User-Agent": `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.52 Safari/537.36`,
                origin: "https://www.jumia.ma",
                referer: "https://www.jumia.ma/",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
        if (response.error) {
            return { ...response.error };
        }
        const $ = cheerio.load(response.data!);
        if ($.length === 0) {
            return {
                message: "no products found",
                status: 404,
                type: "SERVICE",
            };
        }
        const products: JUMIA_PRODUCT[] = [];
        $(this.product).each((_, product) => {
            products.push({
                name: $(product).find(this.product_name).text().trim(),
                url: $(product).find(this.product_url).attr("href"),
                image:
                    $(product).find(this.product_image).attr("data-src") ||
                    $(product).find(this.product_image).attr("src"),
                price: $(product).find(this.price).text().trim(),
                brand: $(product).find(this.brand).attr("data-gtm-brand"),
                category: $(product)
                    .find(this.category)
                    .attr("data-gtm-category"),
            });
        });
        return products
    }
}

export {JUMIA}