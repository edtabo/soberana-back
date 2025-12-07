import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository';
import { PrismaModule } from '../utils/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule],
  providers: [AuthService, AuthRepository],
})
export class AuthModule { }