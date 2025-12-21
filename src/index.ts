import { error, log } from "node:console"
import {get_current_ip} from "./utils/index.ts"
import server from "./server.ts"
server.listen(3000 , (e)=>{
    e ? error(e) : log("server at http://localhost:3000")
    get_current_ip()
    .then(ip=>
    {
        log(`${new Date().toISOString()} - [SERVER] - IP: ${ip}\n`)

    })
    .catch(err=>error("Couldn't fetch current IP:", err))
})
