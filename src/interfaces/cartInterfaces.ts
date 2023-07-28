export interface Product {
  name: string;
  price: number;
}

export interface CartItem {
  products: Product[];
  quantity: number;
}