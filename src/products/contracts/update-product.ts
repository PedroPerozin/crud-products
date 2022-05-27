import { UserEntity } from 'src/user/entities/user.entity';
import { UpdateProductDto } from '../dtos/update-product';

export interface IUpdateProduct {
  exec: (params: IUpdateProduct.Params) => IUpdateProduct.Response;
}

export namespace IUpdateProduct {
  export type Params = UpdateProductDto & { user: UserEntity } & { id: string };
  export type Response = Promise<UpdateProductDto>;
}
