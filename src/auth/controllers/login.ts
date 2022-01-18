import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ILogin } from '../contracts/login';
import { LoginDto } from '../dtos/login';
import { Login } from '../use-cases/login';

@ApiTags('auth')
@Controller('auth')
export class LoginController {
  constructor(private loginService: Login) {}

  @Post('/sign-in')
  async login(@Body(ValidationPipe) loginDto: LoginDto): ILogin.Response {
    return this.loginService.exec(loginDto);
  }
}
