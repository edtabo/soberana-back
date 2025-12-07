import { Injectable, Inject } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthRepository } from './repository';
import { logger } from '../utils/log';
import { localizations } from '../utils/localizations';
import { comparePassword, generateToken } from '../utils/utils';

@Injectable()
export class AuthService {

  @Inject(AuthRepository)
  private readonly query: AuthRepository;

  async auth(createAuthDto: CreateAuthDto) {
    try {
      const query = await this.query.auth(createAuthDto.email);
      if (query === null)
        return {
          success: false,
          message: localizations.errors.notFound,
        };

      const isMatch = await comparePassword(createAuthDto.password, query.password);
      if (!isMatch)
        return {
          success: false,
          message: localizations.errors.notMatch,
        };

      const token = await generateToken(query);
      return {
        success: true,
        data: token,
      };
    } catch (error) {
      logger(error);
      return null;
    }


  }
}
