import {appendFile , writeFile} from "fs/promises"
import { join } from "path";
import { color_text} from "../../shared/utils/colors.js";
import type {RequestHandler , NextFunction , Request , Response} from "express"

// this shit screams "You Ain't Gonna Need It" 💀

const log_file_path = join(process.cwd(), "logs", "server.log");
type log_lvl = "info" | "warn" | "error" | "debug";
async function log_file_exists() {
  try {
    await writeFile(log_file_path, "", { flag: "wx" });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "EEXIST") {
      throw err;
    }
  }
}

function format_log_msg(level: log_lvl, message: string): string {
  const timestamp = new Date().toISOString();
  let colored_lvl: string;
  switch (level) {
    case "info":
      colored_lvl = color_text("INFO", "green");
      break;
    case "warn":
      colored_lvl = color_text("WARN", "yellow");
      break;
    case "error":
      colored_lvl = color_text("ERROR", "red");
      break;
    case "debug":
      colored_lvl = color_text("DEBUG", "cyan");
      break;
  }
    return `[${timestamp}] [${colored_lvl}] ${message}`;
}

export async function log(level: log_lvl, message: string) {
  await log_file_exists();
  const formattedMessage = format_log_msg(level, message);
  console.log(formattedMessage);
  await appendFile(log_file_path, formattedMessage + "\n");
}
export const request_logger : RequestHandler = async (req,_,next)=>{
    await log("debug" , `(GET) => ${req.url}`)
    next()
}