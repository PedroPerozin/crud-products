import { InjectRepository } from '@nestjs/typeorm';

import { IGetUserByParam } from '../contracts';
import { UserRepository } from '../user.repository';

export class GetUserByParam implements IGetUserByParam {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async exec(params: IGetUserByParam.Params): IGetUserByParam.Response {
    const { value, param } = params;
    return this.userRepository.findOne({
      where: { [param]: value },
    });
  }
}
