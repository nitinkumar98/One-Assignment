import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { HttpMethods } from '../constants';
import { UserType } from '../enums';

@Injectable()
export class AuthGuard implements CanActivate {
  private async validateRequest(req: Request) {
    const loginUserId = req.headers['x-login-userid'];
    const userType = req.headers['x-login-user-type'];

    if (
      !loginUserId ||
      !userType ||
      !Object.values(UserType).includes(userType)
    ) {
      throw new HttpException(
        'Not authorized to access endpoint',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (userType === UserType.CUSTOMER && req.method != HttpMethods.GET) {
      throw new HttpException(
        'Not authorized to access endpoint',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (
      userType === UserType.SUPPORTER &&
      ![HttpMethods.DELETE, HttpMethods.GET].includes(req.method)
    ) {
      throw new HttpException(
        'Not authorized to access endpoint',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (
      userType === UserType.SELLER &&
      ![HttpMethods.POST, HttpMethods.PATCH, HttpMethods.GET].includes(
        req.method,
      )
    ) {
      throw new HttpException(
        'Not authorized to access endpoint',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
}
