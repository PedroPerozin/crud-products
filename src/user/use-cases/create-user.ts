import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUser } from '../contracts/create-user';
import { UserEntity } from '../entities/user.entity';
import { EmailAlreadyExistsException } from '../exception/conflict-exception';
import { UserRepository } from '../user.repository';
import { GetUserByEmail } from './get-user-by-email';
import { HashPassword } from './hash-password';

@Injectable()
export class CreateUser implements ICreateUser {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private hashPassword: HashPassword,
    private getUserByEmail: GetUserByEmail,
  ) {}

  async exec(params: ICreateUser.Params): ICreateUser.Response {
    const { firstName, lastName, email, password } = params;

    const userEmail = await this.getUserByEmail.exec({ email });
    if (userEmail) {
      throw new EmailAlreadyExistsException();
    }

    // const userEntity = new UserEntity()
    // userEntity.firstName = firstName

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      passwordHash: this.hashPassword.exec({ password }),
    });
    return this.userRepository.save(user);
  }
}
