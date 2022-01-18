import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

import { IValidatePassword } from '../contracts/validate-password';
import { InvalidCredentialsException } from '../exceptions/invalid.credentials';

@Injectable()
export class ValidatePassword implements IValidatePassword {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async exec(params: IValidatePassword.Params): IValidatePassword.Response {
    const { password, hash } = params;
    const isValid = compareSync(password, hash);
    if (!isValid) {
      throw new InvalidCredentialsException();
    }

    return isValid;
  }
}
