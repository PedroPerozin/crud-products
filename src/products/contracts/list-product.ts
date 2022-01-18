import { ListProductDto } from '../dtos/list-product';
import { ProductEntity } from '../entities/product.entity';

export interface IListProduct {
  exec: (params: IListProduct.Params) => IListProduct.Response;
}
export namespace IListProduct {
  export type Params = ListProductDto;
  export type Response = Promise<[ProductEntity[], number]>;
}
