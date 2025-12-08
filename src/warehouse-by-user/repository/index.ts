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
    const maxCount = 3;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const monthlyCounts = await this.prisma.inventoryRecord.groupBy({
      by: ['warehouse_id', 'counter'],
      where: {
        user_warehouse_id: userId,
        warehouse_id: {
          in: warehousesIds,
        },
        create_at: {
          gte: firstDayOfMonth
        }
      }
    });

    const warehouseCounterCounts = new Map<number, Set<number>>();
    monthlyCounts.forEach(record => {
      if (!warehouseCounterCounts.has(record.warehouse_id)) {
        warehouseCounterCounts.set(record.warehouse_id, new Set());
      }
      warehouseCounterCounts.get(record.warehouse_id)?.add(record.counter);
    });

    const todayCounts = await this.prisma.inventoryRecord.findMany({
      where: {
        user_warehouse_id: userId,
        warehouse_id: {
          in: warehousesIds,
        },
        create_at: {
          gte: today
        }
      },
      distinct: ['counter'],
      select: {
        warehouse_id: true
      }
    });

    const warehouseCounts = new Map<number, {count: number, hasCountToday: boolean}>();
    
    warehousesIds.forEach(warehouseId => {
      warehouseCounts.set(warehouseId, { count: 0, hasCountToday: false });
    });

    warehouseCounterCounts.forEach((counters, warehouseId) => {
      warehouseCounts.set(warehouseId, {
        count: counters.size,
        hasCountToday: false
      });
    });

    todayCounts.forEach(item => {
      const current = warehouseCounts.get(item.warehouse_id);
      if (current) {
        current.hasCountToday = true;
      }
    });

    const result = warehousesIds.map(warehouseId => {
      const countData = warehouseCounts.get(warehouseId) || { count: 0, hasCountToday: false };
      const countsLeft = Math.max(0, maxCount - countData.count);
      const nextCount = countData.count + 1;
     
      return {
        warehouse: warehouseId,
        left: countsLeft,
        canCountToday: countsLeft > 0,
        nextCountNumber: nextCount > maxCount ? maxCount : nextCount
      };
    });

  

    return result;
    
  } catch (error) {
    logger(error);
    return null;
  }
}




}