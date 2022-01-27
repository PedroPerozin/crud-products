import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { CreateUserDto, ResponseCreateUserDto } from '../dtos';
import { CreateUser } from '../use-cases';

@Controller('create')
export class CreateUserController {
  constructor(private createUser: CreateUser) {}

  @Post('/user')
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ResponseCreateUserDto> {
    const result = await this.createUser.exec(createUserDto);
    return ResponseCreateUserDto.factory(ResponseCreateUserDto, result);
  }
}
