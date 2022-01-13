export interface ILogin {
  exec: (params: { email: string; password: string }) => Promise<void>;
}
