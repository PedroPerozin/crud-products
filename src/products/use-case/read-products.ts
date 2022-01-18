import { InjectRepository } from '@nestjs/typeorm';
import { IReadProduct } from '../contracts/read-product';
import { ProductRepository } from '../product.repository';

export class ReadProduct implements IReadProduct {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async exec(params: IReadProduct.Params): IReadProduct.Response {
    const { pageSize, page } = params;
    console.log('AAAAAAAAAAa');

    console.log(params);

    return this.productRepository.readProduct(pageSize, page);
  }
}
