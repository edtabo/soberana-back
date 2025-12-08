export interface IWarehouseByUser {
    warehouse_id: number;
    warehouse: {
        name: string;
        code: string;
    };
}

export interface IWarehouseByUserCount {
    warehouse: number;
    left: number;
    canCountToday: boolean;
    nextCountNumber: number;
}

export interface IWarehouseByUserResponse {
  id: number;
  name: string;
  code: string;
  canCountToday: boolean;
  nextCountNumber: number;
}

export interface IResponse {
  success: boolean;
  data?: IWarehouseByUserResponse[];
  message?: string;
}
