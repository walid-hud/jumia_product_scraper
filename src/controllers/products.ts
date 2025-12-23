import { type Request, type Response, type NextFunction } from "express";
import get_products_data from "../services/products.ts";

async function Handler(req: Request, res: Response, next: NextFunction) {
  try {
    // 400 — bad request
    if (!req.query?.query) {
      return res.status(400).json({ error: "invalid request" });
    }

    const query = String(req.query.query);
    const page = Number(req.query.page ?? 1);

    const products = await get_products_data(query, page);
    if (products.products?.length) {
      return res.json({ products });
    }

    return res.status(404).json({ error: "no product found" });

  } catch (error) {
    return next(error);
  }
}

export default Handler;
