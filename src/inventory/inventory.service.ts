import { Injectable, Inject } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { logger } from 'src/utils/log';
import { InventoryRepository } from './repository';

@Injectable()
export class InventoryService {

  @Inject(InventoryRepository)
  private readonly query: InventoryRepository;

  // create(createInventoryDto: CreateInventoryDto) {
  //   return 'This action adds a new inventory';
  // }

  async findAll() {
    try {
      const data = await this.query.findAll();
      return `This action returns all inventory`;
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
