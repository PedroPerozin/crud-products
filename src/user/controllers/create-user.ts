import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user';
import { CreateUser } from '../use-cases/create-user';

@Controller('create')
export class CreateUserController {
  constructor(private createUser: CreateUser) {}

  @Post('/user')
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.createUser.exec(createUserDto);
  }
}
