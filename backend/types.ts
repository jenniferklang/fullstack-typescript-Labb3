export interface Wholesalers {
  city_id: number;
  city_name: string;
  grossist_name: string;
  product: string;
  price: number;
}

export type WholesalersArray = Array<Wholesalers>;
