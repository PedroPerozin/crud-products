import { ProductEntity } from '../entities/product.entity';

export interface IGetProductByParam {
  exec: (params: IGetProductByParam.Params) => IGetProductByParam.Response;
}

export namespace IGetProductByParam {
  export type Params = {
    param: string;
    value: string;
  };
  export type Response = Promise<ProductEntity>;
}
