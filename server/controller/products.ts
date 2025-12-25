import type { API_REQUEST_QUERY} from "@shared/types.ts"
import type { RequestHandler } from "express"
const products_controller :RequestHandler = async (req, res, next)=>{
    try {
        if(!req.query || !req.query.query || !req.query.page){
            
        }
    } catch (error) {

    }
}