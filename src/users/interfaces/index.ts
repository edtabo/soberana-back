export interface IUser {
  id: number;
  name: string;
  last_name: string;
  email: string;
  role: number;
  warehousesuser?: {
    warehouse_id: number;
  }[];
}

export interface IResponse {
  success: boolean;
  data?: IUser[] | IUser;
  message?: string;
}
