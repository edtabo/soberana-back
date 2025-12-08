import { Inject, Injectable } from '@nestjs/common';
import { CommonStrings } from '../utils/enums/commons';
import { WarehouseByUserRepository } from './repository';
import { localizations } from '../utils/localizations';
import { logger } from '../utils/log';
import { IResponse } from './interfaces';

@Injectable()
export class WarehouseByUserService {

    @Inject(WarehouseByUserRepository)
    private readonly query: WarehouseByUserRepository;

    async findAll(req: Request): Promise<IResponse> {
      try {
        const userId = req[CommonStrings.USER_PROPERTY]?.id as number;
        const userWarehouses = req[CommonStrings.USER_PROPERTY]?.warehouses;
        const warehousesIds = userWarehouses.map((item) => item.warehouse_id);

        const warehouseQuery = await this.query.findAll(userId);
        const countsQuery = await this.query.getCounts({userId, warehousesIds});

        if (!warehouseQuery || !countsQuery) throw new Error(localizations.errors.tryAgain);

        const data = warehouseQuery.map(item => {
          const countInfo = countsQuery?.find(count => count.warehouse === item.warehouse_id);
          return {
            id: item.warehouse_id,            
            name: item.warehouse.name,
            code: item.warehouse.code,
            canCountToday: countInfo?.canCountToday || false,
            nextCountNumber: countInfo?.nextCountNumber || 1
          }
        })
        
        return {
          success: true,
          data: data,
        };
      } catch (error) {
        logger(error);
        throw error;
      }
    }
}
