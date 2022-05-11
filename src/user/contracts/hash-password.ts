export interface IHashPassword {
  exec: (params: IHashPassword.Params) => IHashPassword.Response;
}

export namespace IHashPassword {
  export type Params = { password: string };
  export type Response = string;
}
