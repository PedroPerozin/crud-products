import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { GetLanguageById } from '~/general/languages/use-cases';
import { GetTimezoneById } from '~/general/timezones/use-cases';
import { GetTenantById } from '~/tenants/use-cases';
import { ICreateUser } from '~/users/contracts';
import { EmailAlreadyExistsException } from '~/users/exceptions';
import { HashPassword } from '~/users/use-cases';
import { GetUserByParam } from '~/users/use-cases/get-user-by-param';
import { UserRepository } from '~/users/user.repository';

@Injectable()
export class CreateUser implements ICreateUser {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private getTenantById: GetTenantById,
    private getTimezoneById: GetTimezoneById,
    private getLanguageById: GetLanguageById,
    @Inject(forwardRef(() => HashPassword))
    private hashPassword: HashPassword,
    private getUserByParam: GetUserByParam,
  ) {}

  async execute(params: ICreateUser.Params): Promise<ICreateUser.Response> {
    const {
      languageId,
      timezoneId,
      tenantId,
      email,
      lastName,
      password,
      firstName,
    } = params;
    const emailAlreadyExists = await this.getUserByParam.execute({
      param: 'email',
      value: email,
      tenantId,
    });
    if (emailAlreadyExists) throw new EmailAlreadyExistsException();
    const tenant = await this.getTenantById.execute({ tenantId });
    const timezone = await this.getTimezoneById.execute({
      timezoneId,
    });
    const language = await this.getLanguageById.execute({
      languageId,
      tenantId,
    });
    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      passwordHash: this.hashPassword.execute({ password }),
      securityStamp: uuid(),
      tenant,
      timezone,
      language,
      accessFailedCount: 0,
    });
    return this.userRepository.save(user);
  }
}
