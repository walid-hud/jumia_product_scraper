import path from "path";
import cors from "cors"
import express , {static as _static , }  from "express";
import { log ,request_logger } from "./service/logger.ts";
const PORT = process.env.PORT || 3000;
const server = express();
server.use(_static(path.join(process.cwd(), "./client/dist")));
server.use(cors())
server.use(request_logger)

server.get("/", (_, res) => {
    res.sendFile(path.join(process.cwd(), "client/dist/index.html"));
});

server.listen(PORT, (e) => {
    if(e){
        log("error", `Error starting server: ${e}`);
        return;
    }
    log( "debug", `Server is running on http://localhost:${PORT}`);
});