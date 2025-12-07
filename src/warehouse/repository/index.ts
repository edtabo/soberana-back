import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../utils/prisma/prisma.service";
import { logger } from '../../utils/log';
import { IWarehouse } from '../interfaces';

@Injectable()
export class WarehouseRepository {

  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async findAll(): Promise<IWarehouse[] | null> {
    try {
      const query = await this.prisma.warehouse.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          status: true,
        },
      });

      return query;
    }
    catch (error) {
      logger(error);
      return null;
    }
  }

}

