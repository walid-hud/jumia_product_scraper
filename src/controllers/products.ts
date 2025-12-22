import {type Request,type Response ,type NextFunction, } from "express"
import get_products_data from "../services/products.ts"
async function Handler(req:Request , res:Response , next:NextFunction){
    if(!req.query || !req.query.query) {res.status(400).json({error:"invalid request"});next()} 
    const query = String(req.query.query)
    const page = Number(req.query.page ?? 1) 
    const products = await get_products_data(query , page)
    if(products.products && products.products.length > 0){
        res.json({products})
    }else{
        res.status(404).json({error: "no product found"})
    }
    res.status(400).json({error:"invalid request"})   
    next()
}
export default Handler

function get_products_data_recursive(query : string, start_page = 1 , end_page:number){

}