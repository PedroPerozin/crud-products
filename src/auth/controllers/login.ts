import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ILogin } from '../contracts';
import { LoginDto } from '../dtos/login';
import { Login } from '../use-cases';

@ApiTags('auth')
@Controller('auth')
export class LoginController {
  constructor(private loginService: Login) {}

  @Post('/sign-in')
  async login(@Body() loginDto: LoginDto): ILogin.Response {
    return this.loginService.exec(loginDto);
  }
}
