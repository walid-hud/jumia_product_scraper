import { error, log } from "node:console"
import server from "./server.ts"
server.listen(3000 , (e)=>{
    e ? error(e) : log("server at http://localhost:3000")
})
