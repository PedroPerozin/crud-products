import { UserEntity } from 'src/user/entities/user.entity';
import { ReadProductDto } from '../dtos/read-product';
import { ProductEntity } from '../entities/product.entity';

export interface IReadProduct {
  exec: (params: IReadProduct.Params) => IReadProduct.Response;
}
export namespace IReadProduct {
  export type Params = ReadProductDto;
  export type Response = Promise<[ProductEntity[], number]>;
}
