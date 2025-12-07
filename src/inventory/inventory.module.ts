import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PrismaModule } from 'src/utils/prisma/prisma.module';
import { InventoryRepository } from './repository';

@Module({
  controllers: [InventoryController],
  imports: [PrismaModule],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
