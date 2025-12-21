import { error, log } from "node:console"
import {get_current_ip , write_log} from "./utils/index.ts"
import server from "./server.ts"
server.listen(3000 , (e)=>{
    e ? error(e) : log("server at http://localhost:3000")
    get_current_ip()
    .then(ip=>
    {
        log(`${new Date().toISOString()} - [SERVER] - IP: ${ip}\n`)
        return ip
    })
    .then((ip)=>
        write_log(`${new Date().toISOString()} - [SERVER] - IP: ${ip}\n`)
    )
})
