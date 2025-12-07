import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './utils/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, WarehouseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
