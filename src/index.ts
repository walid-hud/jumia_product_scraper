import { log } from "node:console"
import server from "./server.ts"
server.listen(3000 , (e)=>{
    log("server at http://localhost:3000")
})
