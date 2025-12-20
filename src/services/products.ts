import * as cheerio from "cheerio"
import { test_product } from "../utils/test_data.ts";
const $ = cheerio.load(test_product)

const get_products_data = (query: string): object => {return {
    data:$(".img-c").toString()
}}
export default get_products_data;