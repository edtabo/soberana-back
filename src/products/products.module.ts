import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './repository';
import { PrismaModule } from 'src/utils/prisma/prisma.module';

@Module({
  controllers: [ProductsController],
  imports: [PrismaModule],
  providers: [ProductsService, ProductRepository],
})
export class ProductsModule {}
