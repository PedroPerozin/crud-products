import { InjectRepository } from '@nestjs/typeorm';
import { IFilterProduct } from '../contracts';
import { ProductRepository } from '../product.repository';

export class ListProduct implements IFilterProduct {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async exec(params: IFilterProduct.Params): IFilterProduct.Response {
    return this.productRepository.readProduct({ ...params });
  }
}
