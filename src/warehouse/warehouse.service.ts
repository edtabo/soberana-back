import { Inject, Injectable } from '@nestjs/common';
import { WarehouseRepository } from './repository';
import { localizations } from '../utils/localizations';
import { IResponse } from './interfaces';

@Injectable()
export class WarehouseService {

  @Inject(WarehouseRepository)
  private readonly query: WarehouseRepository;

  async findAll(): Promise<IResponse> {
    try {
      const data = await this.query.findAll();
      if (!data) throw new Error(localizations.errors.tryAgain);

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

}
