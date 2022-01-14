import { Injectable } from '@nestjs/common';
import { ILogin } from '../contracts/login';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException } from '../exceptions/invalid.credentials';
import { UserRepository } from 'src/user/user.repository';
import { GetUserByEmail } from 'src/user/use-cases/get-user-by-email';

@Injectable()
export class Login implements ILogin {
  constructor(
    private getUserByEmail: GetUserByEmail,
    private jwtService: JwtService,
  ) {}

  async exec(params: ILogin.Params): ILogin.Response {
    const foundUser = await this.getUserByEmail.exec({ email: params.email });

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
