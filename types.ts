
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
  doNotRepeat?: boolean;
  status?: 'AVAILABLE' | 'OUT_OF_STOCK' | 'DELISTED';
  previousPrice?: number;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
}