import { Injectable, Inject } from "@nestjs/common";

import { PrismaService } from "../../utils/prisma/prisma.service";
import { logger } from '../../utils/log';
import { IAuth } from '../interfaces';

@Injectable()
export class AuthRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async auth(email: string): Promise<IAuth | null> {
    try {
      const query = await this.prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          last_name: true,
          password: true,
          role: true,
        },
      });
      return query;
    }
    catch (error) {
      logger(error);
      return null;
    }
  }
}