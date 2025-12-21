import axios from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";
import net from "net";
import {appendFile} from "fs/promises"
const jumia = {
  product: "article.prd",
  search_url: "https://www.jumia.ma/catalog/?",
  search_prefix: "q=",
  page_prefix: "page=",
  last_page_label: `aria-label="Dernière page"`,
  product_link: "a.core",
  product_url: "a.core",
  product_name: "h3.name",
  product_image: ".img-c img",
  product_image_alt: ".img-c img",
  price: ".prc",
  brand: "a.core",
  category: "a.core",
};

const ansi_escape_codes = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  },
};

const logger = (
  req: any,
  res: any,
  next: any
) /*ain't gonna type these params, you already know what it does 🫩*/ => {
  console.log(
    `${ansi_escape_codes.fg.cyan}[${new Date().toISOString()}] ${req.method} ${
      req.url
    } ${ansi_escape_codes.reset}`
  );
  next();
};

const log_file_path = "./logs/request.log";
const agent = new SocksProxyAgent("socks5h://127.0.0.1:9050");
async function fetch_page(url: string) {
  const res = await axios.get(url, {
    httpAgent: agent,
    httpsAgent: agent,
    headers: {
      "User-Agent": `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.52 Safari/537.36`,
      origin: "https://jumia.ma",
      referer: "https://jumia.ma/",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
  return await res.data;
}

function send_control(cmd: string) {
  return new Promise((resolve, reject) => {
    const s = net.connect(9051, "127.0.0.1", () => s.write(cmd + "\r\n"));
    let out = "";
    s.on("data", (d) => (out += d.toString()));
    s.on("end", () => resolve(out));
    s.on("error", reject);
  });
}

async function new_identity(password: string) {
  await send_control(`AUTHENTICATE "${password}"`);
  await send_control("SIGNAL NEWNYM");
  await sleep(5000);
}

async function get_current_ip(): Promise<string> {
  const res = await axios.get("https://api.ipify.org?format=text", {
    httpAgent: agent,
    httpsAgent: agent,
  });
  return res.data;
}

async function log_ip_change() {
  const new_ip = await get_current_ip();
  const log_entry = `${new Date().toISOString()} - [INFO] - New IP: ${new_ip}\n`;
  await write_log(log_entry);
}
async function write_log(content: string) {
  await appendFile(log_file_path, content);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export { jumia, logger, ansi_escape_codes, fetch_page, new_identity, sleep, log_ip_change, get_current_ip, write_log };
