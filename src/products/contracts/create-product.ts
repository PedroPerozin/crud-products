import { UserEntity } from '../../user/entities/user.entity';
import { CreateProductDto } from '../dtos/create-product';
import { ProductEntity } from '../entities/product.entity';

export interface ICreateProducts {
  exec: (ICreateProducts: ICreateProducts.Params) => ICreateProducts.Response;
}

export namespace ICreateProducts {
  export type Params = CreateProductDto & { user: UserEntity };
  export type Response = Promise<ProductEntity>;
}
