import express ,{ type Express}from "express"
const server : Express = express()
server.get("/" , (req , res)=>{
    res.end("test")
})

export default server