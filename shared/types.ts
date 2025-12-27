type API_RESPONSE<T> = {
    success:boolean,
    data?:T,
    error?:APP_ERROR
}
type APP_ERROR = {
    status:number,
    message:string,
    type:"SERVER" | "SERVICE" | "CLIENT"
}
type JUMIA_PRODUCT = {
  name: string;
  url: string | undefined;
  image: string | undefined;
  price: string;
  brand: string | undefined;
  category: string | undefined;
}
type API_REQUEST_QUERY = {
    query: string;
    page: number ;
}
export type {API_RESPONSE , APP_ERROR, JUMIA_PRODUCT , API_REQUEST_QUERY} 