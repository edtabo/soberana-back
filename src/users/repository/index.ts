import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { IUser } from '../interfaces';
import { logger } from '../../utils/log';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { setPassword } from '../../utils/utils';

@Injectable()
export class UsersRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async findAll(): Promise<IUser[] | null> {
    try {
      const query = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          last_name: true,
          email: true,
          role: true,
        },
      });

      return query;
    } catch (error) {
      logger(error);
      return null;
    }
  }

  async findOne(id: number): Promise<IUser | null> {
    try {
      const query = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          last_name: true,
          email: true,
          role: true,
          warehousesuser: {
            select: {
              warehouse_id: true,
            },
          },
        },
      });
      return query;
    } catch (error) {
      logger(error);
      return null;
    }
  }

  async emailExist(email: string): Promise<boolean> {
    try {
      const query = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      return query ? true : false;
    } catch (error) {
      logger(error);
      return false;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<IUser | null> {
    try {
      const query = await this.prisma.$transaction(async (txn) => {
        const userQuery = await txn.user.create({
          data: {
            name: createUserDto.name,
            last_name: createUserDto.last_name,
            email: createUserDto.email,
            role: createUserDto.role,
            password: await setPassword(createUserDto.password),
          },
        });

        let warehouses;
        if (createUserDto.warehouses && createUserDto.warehouses.length > 0) {
          warehouses = await txn.userWarehouse.createMany({
            data: createUserDto.warehouses.map((id) => ({
              user_id: userQuery.id,
              warehouse_id: id,
            })),
          });
        }
        return warehouses;
      });

      return query;
    } catch (error) {
      logger(error);
      return null;
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser | null> {
    try {
      console.log(' 11111111 ');
      const query = await this.prisma.$transaction(async (txn) => {
        let data;
        if (updateUserDto.password)
          data = {
            name: updateUserDto.name,
            last_name: updateUserDto.last_name,
            password: await setPassword(updateUserDto.password),
          };
        else
          data = {
            name: updateUserDto.name,
            last_name: updateUserDto.last_name,
          };

        console.log(' 22222222 ');
        const userQuery = await txn.user.update({
          where: {
            id,
          },
          data: data,
        });

        let warehouses;

        console.log(' 33333333 ');
        if (updateUserDto.warehouses && updateUserDto.warehouses.length > 0) {
          warehouses = await txn.userWarehouse.deleteMany({
            where: {
              user_id: userQuery.id,
            },
          });
          await txn.userWarehouse.createMany({
            data: updateUserDto.warehouses.map((id) => ({
              user_id: userQuery.id,
              warehouse_id: id,
            })),
          });
          console.log(' 44444444 ');
        }

        console.log(' 55555555 ');
        return warehouses;
      });

      console.log(' +++++++++++++++++ ');
      console.log(query);
      console.log(' +++++++++++++++++ ');

      return query;
    } catch (error) {
      logger(error);
      return null;
    }
  }

  async remove(id: number): Promise<boolean | null> {
    try {
      const query = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return query ? true : false;
    } catch (error) {
      logger(error);
      return null;
    }
  }
}
