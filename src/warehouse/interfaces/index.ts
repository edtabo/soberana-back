export interface IWarehouse {
  id: number;
  name: string;
  code: string;
  status: boolean;
}

export interface IResponse {
  success: boolean;
  data?: IWarehouse[] | IWarehouse;
  message?: string;
}