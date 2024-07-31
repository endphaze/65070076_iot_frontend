export interface Book {
  id: number;
  title: string;
  detail: string;
  year: number;
  is_published: boolean;
  description: string;
  synopsis: string;
  category: string;
}

export interface Coffee {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  order_id: number;
}

export interface OrderDetail {
  id: number;
  order_id: number;
  coffee_id: number;
  quantity: number;

}
