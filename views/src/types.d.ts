type Product = {
  name: string;
  url: string | undefined;
  image: string | undefined;
  price: string;
  brand: string | undefined;
  category: string | undefined;
};
type Products = {products:{current_page: number, last_page: number, products: Product[]};}

export type { Product, Products };