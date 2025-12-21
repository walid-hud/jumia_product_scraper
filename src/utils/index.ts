import axios from "axios";

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


const logger = (req: any, res: any, next: any) /*ain't gonna type these params, you know what it does 🫩*/ => {
  console.log(
`${ansi_escape_codes.fg.cyan }[${new Date().toTimeString()}] ${req.method} ${req.url} ${ansi_escape_codes.reset}`
);
  next();
}

async function fetch_page(url:string){
    const res = await axios.get(url,{headers:{
    "User-Agent":`Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.52 Safari/537.36`,
    origin:"https://jumia.ma",
    referer:"https://jumia.ma/",
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    }})
    return await res.data
}
export { jumia, logger , ansi_escape_codes , fetch_page};