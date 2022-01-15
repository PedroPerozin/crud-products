import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user';
import { ResponseCreateUserDto } from '../dto/response-create-user';
import { CreateUser } from '../use-cases/create-user';

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

// const a = async (paramA: number): Promise<number> => {
//   return 2;
// };
