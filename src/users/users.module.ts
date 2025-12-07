import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../utils/prisma/prisma.module';
import { UsersRepository } from './repository';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository],
})
export class UsersModule { }
