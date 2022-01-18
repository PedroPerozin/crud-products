import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found';
import { GetUserByParam } from 'src/user/use-cases/get-user-by-param';

import { JwtPayload } from './types/jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private getUserByParam: GetUserByParam) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.getUserByParam.exec({
      param: 'id',
      value: payload.id,
    });
    if (!user) {
      throw new UserNotFoundException();
      //TODO trocar para toke não valido
    }
    return user;
  }
}
