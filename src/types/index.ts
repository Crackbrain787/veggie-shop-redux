export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface AppState {
  products: ProductsState;
  cart: CartState;
}