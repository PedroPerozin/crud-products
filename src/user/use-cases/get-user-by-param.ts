import { InjectRepository } from '@nestjs/typeorm';

import { IGetUserByParam } from '../contracts/get-user-by-param';
import { UserNotFoundException } from '../exceptions/user-not-found';
import { UserRepository } from '../user.repository';

export class GetUserByParam implements IGetUserByParam {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async exec(params: IGetUserByParam.Params): IGetUserByParam.Response {
    const { value, param } = params;
    const foundUser = await this.userRepository.findOne({
      where: { [param]: value },
    });
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    return foundUser;
  }
}
