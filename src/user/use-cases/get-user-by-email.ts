import { InjectRepository } from '@nestjs/typeorm';
import { IGetUserByEmail } from '../contracts/get-user-by-email';
import { UserRepository } from '../user.repository';

export class GetUserByEmail implements IGetUserByEmail {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async exec(params: IGetUserByEmail.Params): IGetUserByEmail.Response {
    const foundUser = await this.userRepository.findOne({
      email: params.email,
    });
    return foundUser;
  }
}
