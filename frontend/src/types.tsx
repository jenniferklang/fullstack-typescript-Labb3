export interface Grossist {
  city_id: number;
  city_name: string;
  grossist_name: string;
  product: string;
  price: number;
}

export type GrossistArray = Grossist[];

export interface GrossistListProps {
  data: Grossist[];
  onDelete: (cityId: number, grossistName: string) => void;
  onAdd: (cityId: number) => void;
  deleteClicked: boolean;
  selectedCity: string;
}

export interface DropdownProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}
