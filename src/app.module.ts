import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './utils/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { WarehouseByUserModule } from './warehouse-by-user/warehouse-by-user.module';
import { AuthGuard } from './guards/auth.guard';
import { UsersRepository } from './users/repository';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    WarehouseModule,
    ProductsModule,
    InventoryModule,
    WarehouseByUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
