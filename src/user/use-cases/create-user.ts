import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateUser } from '../contracts/create-user';
import { EmailAlreadyExistsException } from '../exceptions/conflict-exception';
import { UserRepository } from '../user.repository';
import { GetUserByParam } from './get-user-by-param';
import { HashPassword } from './hash-password';

@Injectable()
export class CreateUser implements ICreateUser {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private hashPassword: HashPassword,
    private getUserByParams: GetUserByParam,
  ) {}

  async exec(params: ICreateUser.Params): ICreateUser.Response {
    const { firstName, lastName, email, password } = params;

    const userEmail = await this.getUserByParams.exec({
      param: 'email',
      value: email,
    });
    if (userEmail) {
      throw new EmailAlreadyExistsException();
    }

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      passwordHash: this.hashPassword.exec({ password }),
    });
    return this.userRepository.save(user);
  }
}
