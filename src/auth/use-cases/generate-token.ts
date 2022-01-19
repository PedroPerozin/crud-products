import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGenerateToken } from '../contracts/generate-token';

@Injectable()
export class GenerateToken implements IGenerateToken {
  constructor(private jwtService: JwtService) {}

  exec(params: IGenerateToken.Params): IGenerateToken.Response {
    const { payload } = params;
    return this.jwtService.sign(payload);
  }
}
