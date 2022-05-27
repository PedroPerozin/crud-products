import { Injectable } from '@nestjs/common';
import { GetUserByParam } from '../../user/use-cases';

import { ILogin } from '../contracts';
import { InvalidCredentialsException } from '../exceptions';
import { GenerateSignInCredentials } from './generate-login-credentials';
import { ValidatePassword } from './validate-password';

@Injectable()
export class Login implements ILogin {
  constructor(
    private getUserByParam: GetUserByParam,
    private validatePassword: ValidatePassword,
    private generateSignInCredentials: GenerateSignInCredentials,
  ) {}

  async exec(params: ILogin.Params): ILogin.Response {
    const { email } = params;
    const foundUser = await this.getUserByParam.exec({
      param: 'email',
      value: email,
    });
    if (!foundUser) {
      throw new InvalidCredentialsException();
    }

    await this.validatePassword.exec({
      password: params.password,
      hash: foundUser.passwordHash,
    });

    return this.generateSignInCredentials.exec({ user: foundUser });
  }
}
