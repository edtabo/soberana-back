import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { logger } from '../../utils/log';
// import { IWarehouse } from '../interfaces';

@Injectable()
export class InventoryRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async findAll() {
    try {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      let query: any[];

      if (day < 10) {
        query = await this.prisma.inventoryCount.findMany({
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
