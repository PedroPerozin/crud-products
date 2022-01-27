import { Injectable } from '@nestjs/common';

import { IGenerateSignInCredentials } from '../contracts';
import { GenerateToken } from './generate-token';

@Injectable()
export class GenerateSignInCredentials implements IGenerateSignInCredentials {
  constructor(private generateToken: GenerateToken) {}

  exec(
    params: IGenerateSignInCredentials.Params,
  ): IGenerateSignInCredentials.Response {
    const { user } = params;
    const payload = { id: user.id, email: user.email };
    return {
      accessToken: this.generateToken.exec({ payload }),
    };
  }
}
