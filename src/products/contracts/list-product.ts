import { FilterProductDto } from '../dtos';
import { ProductEntity } from '../entities/product.entity';

export interface IFilterProduct {
  exec: (params: IFilterProduct.Params) => IFilterProduct.Response;
}
export namespace IFilterProduct {
  export type Params = FilterProductDto;
  export type Response = Promise<[ProductEntity[], number]>;
}
