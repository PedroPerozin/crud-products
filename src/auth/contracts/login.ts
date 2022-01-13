import { LoginDto } from 'src/user/dto/login';

export interface ILogin {
  // exec: (params: { email: string; password: string }) => Promise<void>;
  exec: (params: ILogin.Params) => ILogin.Response;
}

export namespace ILogin {
  export type Params = LoginDto;
  export type Response = Promise<{ accessToken: string }>;
}
