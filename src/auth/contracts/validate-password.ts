export interface IValidatePassword {
  exec: (params: IValidatePassword.Params) => IValidatePassword.Response;
}
export namespace IValidatePassword {
  export type Params = { password: string; hash: string };
  export type Response = Promise<boolean>;
}
