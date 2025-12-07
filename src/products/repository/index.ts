import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { logger } from '../../utils/log';
import { IProduct } from '../interfaces';

@Injectable()
export class ProductRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async findAll(): Promise<IProduct[] | null> {
    try {
      const query = await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          packaging_unit: true,
        },
      });

      return query;
    } catch (error) {
      logger(error);
      return null;
    }
  }
}
