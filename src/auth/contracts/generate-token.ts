import { JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from '../types/jwtPayload';

export interface IGenerateToken {
  exec: (params: IGenerateToken.Params) => IGenerateToken.Response;
}

export namespace IGenerateToken {
  export type Params = { payload: JwtPayload; options?: JwtSignOptions };
  export type Response = string;
}
