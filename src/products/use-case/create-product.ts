import { InjectRepository } from '@nestjs/typeorm';

import { ICreateProducts } from '../contracts/create-product';
import { ProductRepository } from '../product.repository';

export class CreateProduct implements ICreateProducts {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async exec(params: ICreateProducts.Params): ICreateProducts.Response {
    const { name, price, user } = params;
    console.log(user);
    const product = this.productRepository.create({
      name,
      price,
    });
    console.log(product);
    return this.productRepository.save({ ...product, user });
  }
}
