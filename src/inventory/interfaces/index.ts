export interface IInventory {
  name: string;
  last_name: string;
  email: string;
  warehousesuser: Array<{
    warehouse: {
      name: string;
      code: string;
      records: Array<{
        counter: number;
        quantity_in_packaging_units: number;
        quantity_in_units: number;
        create_at: Date;
        product: {
          name: string;
          code: string;
          packaging_unit: number;
        };
      }>;
    };
  }>;}

export interface IResponse {
  success: boolean;
  data?: IInventory[] | IInventory;
  message?: string;
}