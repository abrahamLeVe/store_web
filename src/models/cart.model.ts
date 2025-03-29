export interface Color {
  colorId: string;
  colorHex: string;
  colorTitle: string;
  quantity: number;
}

export interface Price {
  priceId: string;
  value: number;
  quantity: number;
  colors?: Color[];
}
