import { Module } from '@nestjs/common';
import { WarehouseByUserService } from './warehouse-by-user.service';
import { WarehouseByUserController } from './warehouse-by-user.controller';
import { PrismaModule } from 'src/utils/prisma/prisma.module';
import { WarehouseByUserRepository } from './repository';

@Module({
  controllers: [WarehouseByUserController],
  imports: [PrismaModule],
  providers: [WarehouseByUserService, WarehouseByUserRepository],
})
export class WarehouseByUserModule {}
