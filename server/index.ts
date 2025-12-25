import path from "path";
import express , {static as _static , }  from "express";
import { log ,request_logger } from "./service/logger.ts";
const server = express();
server.use(request_logger)
// Serve static files from the client/dist directory (will use this line in production)
// server.use(_static(path.join(path.dirname("."), "../client/dist")));

server.get("/", (_, res) => {
    res.sendFile(path.join(path.dirname("."), "../client/dist/index.html"));
});
const PORT = process.env.PORT || 3000;

server.listen(PORT, (e) => {
    if(e){
        log("error", `Error starting server: ${e}`);
        return;
    }
    log( "debug", `Server is running on http://localhost:${PORT}`);
});