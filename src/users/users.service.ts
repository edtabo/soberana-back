import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IResponse, IUser } from './interfaces';
import { UsersRepository } from './repository';
import { localizations } from '../utils/localizations';
import { logger } from '../utils/log';

@Injectable()
export class UsersService {
  @Inject(UsersRepository)
  private readonly query: UsersRepository;

  async create(createUserDto: CreateUserDto): Promise<IResponse> {
    try {
      const emailExist = await this.query.emailExist(createUserDto.email);

      if (emailExist)
        return {
          success: false,
          message: localizations.errors.emailExist,
        };

      const data = await this.query.create(createUserDto);

      if (!data) throw new Error(localizations.errors.tryAgain);

      const item: IUser = {
        id: data.id,
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
      };
      return {
        success: true,
        data: item,
      };
    } catch (error) {
      logger(error);
      throw new Error(localizations.errors.tryAgain);
    }
  }

  async findAll(): Promise<IResponse> {
    try {
      const data = await this.query.findAll();

      if (!data) throw new Error(localizations.errors.tryAgain);

      const items: IUser[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        last_name: item.last_name,
        email: item.email,
        role: item.role,
      }));

      return {
        success: true,
        data: items,
      };
    } catch (error) {
      logger(error);
      throw new Error(localizations.errors.tryAgain);
    }
  }

  async findOne(id: number): Promise<IResponse> {
    try {
      const data = await this.query.findOne(id);
      if (data === null)
        return {
          success: false,
          message: localizations.errors.notFound,
        };

      const item: IUser = {
        id: data.id,
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
        warehousesuser: data.warehousesuser,
      };
      return {
        success: true,
        data: item,
      };
    } catch (error) {
      logger(error);
      throw new Error(localizations.errors.tryAgain);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IResponse> {
    try {
      const data = await this.query.update(id, updateUserDto);
      if (data === null)
        return {
          success: false,
          message: localizations.errors.notUpdated,
        };

      return {
        success: true,
      };
    } catch (error) {
      logger(error);
      throw new Error(localizations.errors.tryAgain);
    }
  }

  async remove(id: number): Promise<IResponse> {
    try {
      const data = await this.query.remove(id);
      if (data === null)
        return {
          success: false,
          message: localizations.errors.notDeleted,
        };

      return {
        success: data,
      };
    } catch (error) {
      logger(error);
      throw new Error(localizations.errors.tryAgain);
    }
  }
}
