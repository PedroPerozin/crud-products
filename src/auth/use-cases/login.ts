import { Injectable } from '@nestjs/common';
import { ILogin } from '../contracts/login';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException } from '../exceptions/invalid.credentials';
import { GetUserByParam } from 'src/user/use-cases/get-user-by-param';

@Injectable()
export class Login implements ILogin {
  constructor(
    private getUserByParam: GetUserByParam,
    private jwtService: JwtService,
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
    const isPasswordValid = compareSync(
      params.password,
      foundUser.passwordHash,
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }
    const payload = { id: foundUser.id, name: foundUser.firstName };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
