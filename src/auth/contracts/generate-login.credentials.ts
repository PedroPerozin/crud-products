import { UserEntity } from 'src/user/entities/user.entity';
import { SignInToken } from '../types/sign-in-token';

export interface IGenerateSignInCredentials {
  exec: (
    params: IGenerateSignInCredentials.Params,
  ) => IGenerateSignInCredentials.Response;
}

export namespace IGenerateSignInCredentials {
  export type Params = {
    user: UserEntity;
  };
  export type Response = SignInToken;
}
