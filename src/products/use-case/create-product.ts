import { InjectRepository } from '@nestjs/typeorm';
import { ICreateProducts } from '../contracts';

import { ProductRepository } from '../product.repository';

export class CreateProduct implements ICreateProducts {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async exec(params: ICreateProducts.Params): ICreateProducts.Response {
    const { name, price, user } = params;
    const product = this.productRepository.create({
      name,
      price,
      user,
    });
    return this.productRepository.save(product);
  }
}
