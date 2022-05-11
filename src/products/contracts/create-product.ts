import { UserEntity } from 'src/user/entities/user.entity';
import { CreateProductDto } from '../dto/create-product';
import { ProductEntity } from '../entities/product.entity';

export interface ICreateProducts {
  exec: (ICreateProducts: ICreateProducts.Params) => ICreateProducts.Response;
}

export namespace ICreateProducts {
  export type Params = CreateProductDto & { user: UserEntity };
  export type Response = Promise<ProductEntity>;
}
