import { Injectable, Inject } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { logger } from 'src/utils/log';
import { IResponse } from './interfaces';
import { InventoryRepository } from './repository';
import { CommonStrings } from 'src/utils/enums/commons';
import { localizations } from '../utils/localizations';

@Injectable()
export class InventoryService {

  @Inject(InventoryRepository)
  private readonly query: InventoryRepository;

  async create(createInventoryDto: CreateInventoryDto, req: Request): Promise<IResponse> {
    try {
      const userId = req[CommonStrings.USER_PROPERTY]?.id as number;
      const data = await this.query.create(createInventoryDto, userId);

      if (!data) throw new Error(localizations.errors.tryAgain);

      return {
        success: true,
      };

    } catch (error) {
      logger(error);
      throw error;
    }
  }

  async findAll(): Promise<IResponse> {
    try {
      const data = await this.query.findAll();
      return {
        success: true,
        data: data ?data : [],
      };
    } catch (error) {
      logger(error);
      throw error;
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} inventory`;
  // }

  // update(id: number, updateInventoryDto: UpdateInventoryDto) {
  //   return `This action updates a #${id} inventory`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} inventory`;
  // }
}
