import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { WarehouseRepository } from './repository';
import { PrismaModule } from 'src/utils/prisma/prisma.module';

@Module({
  controllers: [WarehouseController],
  imports: [PrismaModule],
  providers: [WarehouseService, WarehouseRepository],
})
export class WarehouseModule {}
