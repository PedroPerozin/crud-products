import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/user/dto/login';
import { ILogin } from '../contracts/login';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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
