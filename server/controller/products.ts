import type {
    API_RESPONSE,
    APP_ERROR,
    JUMIA_PRODUCT,
} from "../../shared/types.ts";
import type { RequestHandler } from "express";
import { JUMIA_provider } from "../provider/products.ts";
import { log } from "../service/logger.ts";
const products_controller: RequestHandler = async (req, res) => {
    try {
        if (!req.query || !req.query.query || !req.query.page) {
            const response: API_RESPONSE<null> = {
                success: false,
                error: {
                    message: "invalid request",
                    status: 400,
                    type: "CLIENT",
                },
            };
            res.status(400).json(response);
        } else {
            const query = req.query.query as string;
            const page = Number(req.query.page);
            const data = (await JUMIA_provider.get_products(
                query,
                page
            )) as any;
            if (data.length) {
                const response: API_RESPONSE<JUMIA_PRODUCT[]> = {
                    success: true,
                    data: data as JUMIA_PRODUCT[],
                };
                res.json(response);
            } else if (data.status) {
                const error = data as APP_ERROR;
                const response: API_RESPONSE<null> = { success: false, error };
                res.json(response);
            }
        }
    } catch (error) {
        await log("error", String(error));
        res.json({
            success: false,
            error: { message: "unknown server error" ,status:500 , type:"SERVER" },
        } as API_RESPONSE<null>);
    }
};

export default products_controller