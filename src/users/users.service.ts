import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { DATABASE_PROVIDERS } from '../constants';
import { IUsersModel } from '../models';

const randomstring = require('randomstring');

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_PROVIDERS.USERS_MODEL)
    private usersModel: IUsersModel,
  ) {}

  public async userSignUp(body: any) {
    const user = await this.usersModel.findOne(
      {
        username: body.username,
      },
      { _id: 1 },
    );

    if (user) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newCreatedUser = new this.usersModel({
      userId: randomstring.generate(7),
      username: body.username,
      password: body.password,
      userType: body.userType,
      permission: body.permission,
    }).save();
    return newCreatedUser;
  }

  public async userLogin(body: any) {
    const user = await this.usersModel.findOne({
      username: body.username,
      password: body.password,
    });

    if (!user) {
      throw new HttpException(
        'Invalid credentails! Pls signup first',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
