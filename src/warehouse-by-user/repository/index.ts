import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { logger } from '../../utils/log';
import { IWarehouseByUser, IWarehouseByUserCount } from '../interfaces';

@Injectable()
export class WarehouseByUserRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async findAll(id:number): Promise<IWarehouseByUser[] | null> {
    try {
      const query = await this.prisma.userWarehouse.findMany({
        where:{
          user_id: id,
          warehouse:{
            status: true,
          }
        },
        select: {
          warehouse_id: true,
          warehouse: {
            select:{
              name: true,
              code: true,
            }
          }
        },
      });

      return query;
    } catch (error) {
      logger(error);
      return null;
    }
  }

  async getCounts({userId, warehousesIds}: {userId: number, warehousesIds: number[]}): Promise<IWarehouseByUserCount[] | null> {
      try {
        const maxCount = 3

        const warehouseDateCounts = await this.prisma.inventoryRecord.groupBy({
          by: ['warehouse_id', 'create_at'],
          where: {
            user_warehouse_id: userId,
            warehouse_id: {
              in: warehousesIds,
            },
          },
          _count: {
            id: true,
          },
        });

        const warehouseUniqueDates = new Map<number, number>();
        warehouseDateCounts.forEach(item => {
          const currentCount = warehouseUniqueDates.get(item.warehouse_id) || 0;
          warehouseUniqueDates.set(item.warehouse_id, currentCount + 1);
        });

        const result = warehousesIds.map(warehouseId => {
          const uniqueDatesCount = warehouseUniqueDates.get(warehouseId) || 0;
          const countsLeft = Math.max(0, maxCount - uniqueDatesCount);
          const hasCountToday = warehouseDateCounts.some(
            item => 
              item.warehouse_id === warehouseId && 
              new Date(item.create_at).toDateString() === new Date().toDateString()
          );
          
          return {
            warehouse: warehouseId,
            left: countsLeft,
            canCountToday: !hasCountToday && countsLeft > 0,
            nextCountNumber: uniqueDatesCount + 1
          };
        })

        return result
        
    } catch (error) {
      logger(error);
      return null;
    }
  }}
