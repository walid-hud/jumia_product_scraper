import express  ,{ type Express , static as _static}from "express"
import {join} from "path"
import Handler from "./controllers/products.ts"
const server : Express = express()
server.use(_static(join(process.cwd() , "views")))
server.get("/products" , Handler )

export default server