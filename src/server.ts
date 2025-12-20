import express  ,{ type Express , static as _static}from "express"
const server : Express = express()
import {join} from "path"
server.use(_static(join(process.cwd() , "views")))
export default server