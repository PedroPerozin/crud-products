import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/user/dto/login';
import { Login } from '../use-cases/login';

@ApiTags('auth')
@Controller('auth')
export class LoginController {
  constructor(private loginService: Login) {}

  @Post('/sign-in')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.loginService.exec(loginDto);
  }
}
