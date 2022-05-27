import { LoginDto } from '../dtos/login';

export interface ILogin {
  exec: (params: ILogin.Params) => ILogin.Response;
}

export namespace ILogin {
  export type Params = LoginDto;
  export type Response = Promise<{ accessToken: string }>;
}
