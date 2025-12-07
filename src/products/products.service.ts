import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from './repository';
import { logger } from 'src/utils/log';
import { IResponse } from './interfaces';
import { localizations } from 'src/utils/localizations';

@Injectable()
export class ProductsService {
  @Inject(ProductRepository)
  private readonly query: ProductRepository;

  async findAll(): Promise<IResponse> {
    try {
      const data = await this.query.findAll();
      if (!data) throw new Error(localizations.errors.tryAgain);

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      logger(error);
      throw error;
    }
  }
}
