import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { IValidatePassword } from '../contracts';
import { InvalidCredentialsException } from '../exceptions';

@Injectable()
export class ValidatePassword implements IValidatePassword {
  async exec(params: IValidatePassword.Params): IValidatePassword.Response {
    const { password, hash } = params;
    const isValid = compareSync(password, hash);
    if (!isValid) {
      throw new InvalidCredentialsException();
    }

    return isValid;
  }
}
