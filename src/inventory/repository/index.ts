import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { logger } from '../../utils/log';

@Injectable()
export class InventoryRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

async create(createInventoryDto: CreateInventoryDto, userId: number): Promise<boolean> {
  try {
    
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const latestRecord = await this.prisma.inventoryRecord.findFirst({
      where: {
        user_warehouse_id: userId,
        warehouse_id: createInventoryDto.warehouse_id,
        create_at: {
          gte: firstDayOfMonth
        }
      },
      orderBy: {
        counter: 'desc'
      },
      select: {
        counter: true
      }
    });

    const nextCounter = latestRecord ? latestRecord.counter + 1 : 1;


    const data = createInventoryDto.products.map((product, index) => ({
      product_id: product.product_id,
      warehouse_id: createInventoryDto.warehouse_id,
      user_warehouse_id: userId,
      quantity_in_packaging_units: product.quantity_in_packaging_units,
      quantity_in_units: product.quantity_in_units,
      counter: nextCounter
    }));

    await Promise.all(
      data.map(item => 
        this.prisma.inventoryRecord.create({
          data: item
        })
      )
    );
    return true;
  } catch (error) {
    logger(error);
    return false;
  }
}

  async findAll() {
    try {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      let query: any[];

      if (day < 10) {
        query = await this.prisma.inventoryRecord.findMany({
          select: {
            id: true,
          },
          where: {
            create_at: {
              lt: new Date(currentDate.getFullYear(), month - 1, 4),
            },
          },
        });
        console.log(' ++++++++++++++++ ');
        console.log(query);
        console.log(' ++++++++++++++++ ');
      }

      console.log(' 222222 ');

      return null;
    } catch (error) {
      logger(error);
      return null;
    }
  }
}
