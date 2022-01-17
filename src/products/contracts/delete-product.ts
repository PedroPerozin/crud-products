import { UserEntity } from 'src/user/entities/user.entity';
import { DeleteProductDto } from '../dtos/delete-product';

export interface IDeleteProduct {
  exec: (params: IDeleteProduct.Params) => IDeleteProduct.Response;
}

export namespace IDeleteProduct {
  export type Params = DeleteProductDto & { user: UserEntity };
  export type Response = Promise<{ message: string }>;
}
