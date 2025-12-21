import express  ,{ type Express , static as _static}from "express"
import cors from "cors"
import {join} from "path"
import Handler from "./controllers/products.ts"
import { logger } from "./utils/index.ts"
const server : Express = express()
server.use(cors())
server.use(logger)
server.use(_static(join(process.cwd() , "views")))
server.get("/products" , Handler )

export default server