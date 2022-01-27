import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserEntity } from '../user/entities/user.entity';
import { GetUserByParam } from '../user/use-cases/get-user-by-param';
import { TokenUnauthorizedException } from './exceptions/token-invalid';
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
      throw new TokenUnauthorizedException();
    }
    return user;
  }
}
