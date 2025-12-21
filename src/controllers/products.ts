import {type Request,type Response ,type NextFunction, } from "express"
import get_products_data from "../services/products.ts"
async function Handler(req:Request , res:Response , next:NextFunction){
    if(req.query && req.query.query){
        const query = String(req.query.query)
        const products = await get_products_data(query)
        if(products){
            res.json({products})
        }else{
            res.status(404).json({error: "no product found"})
        }
    }else{
        res.status(400).json({error:"invalid request"})
    }   
    next()
}
export default Handler