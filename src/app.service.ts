import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './utils/prisma/prisma.service';

@Injectable()
export class AppService {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  getHello(): string {
    return 'Hello World!';
  }
}
