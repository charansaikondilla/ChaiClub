
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface Category {
  name: string;
  items: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  options: { [key: string]: string };
}
