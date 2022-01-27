import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';

import { IHashPassword } from '../contracts';

@Injectable()
export class HashPassword implements IHashPassword {
  exec(params: IHashPassword.Params): IHashPassword.Response {
    const { password } = params;
    const salt = genSaltSync(Number(process.env.HASH_ROUNDS));
    return hashSync(password, salt);
  }
}
