export interface IProduct {
  id: number;
  name: string;
  code: string;
  packaging_unit: number;
}

export interface IResponse {
  success: boolean;
  data?: IProduct[] | IProduct;
  message?: string;
}
