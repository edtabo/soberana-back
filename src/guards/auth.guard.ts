import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/repository';
import { CommonStrings } from 'src/utils/enums/commons';
import { tokenDecode } from 'src/utils/utils';


@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(UsersRepository)
  private readonly usersRepository: UsersRepository;

  private excludedRoutes = [
    { path: '/api/auth', method: 'post' },
    { path: '/api/users', method: 'post' },
  ];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const { url, method } = req;

    const cleanUrl = url.split('?')[0];
    const isExcluded = this.excludedRoutes.some(
      (route) =>
        cleanUrl.startsWith(route.path) &&
        method.toLowerCase() === route.method.toLowerCase(),
    );

    if (isExcluded) return true;

    const authorization = req.headers['authorization'];
    const token = authorization.split('Bearer ')[1];

    if ( typeof authorization !== 'string' || !authorization.startsWith('Bearer ') || token === '' )
      throw new UnauthorizedException('Token invalido');    

    try {
        const jwtDecode = await tokenDecode(token);
        const userQuery = await this.usersRepository.findOne(jwtDecode.id);

        if (!userQuery)
            throw new UnauthorizedException('Credenciales incorrectas');


        req[CommonStrings.USER_PROPERTY] = {
            id: Number(userQuery?.id),
            warehouses: userQuery?.warehousesuser
        };
        
        return true;
    } catch (error: any) {
        console.log(error);
      throw new UnauthorizedException(error);
    }
  }
}