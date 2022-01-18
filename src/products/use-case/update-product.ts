import { InjectRepository } from '@nestjs/typeorm';

import { IUpdateProduct } from '../contracts/update-product';
import { ProductNotFoundException } from '../exceptions/product-not-found';
import { ProductRepository } from '../product.repository';

export class UpdateProduct implements IUpdateProduct {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async exec(params: IUpdateProduct.Params): IUpdateProduct.Response {
    const { name, price, user } = params;

    const product = await this.productRepository.findOne({ user });
    if (!product) {
      throw new ProductNotFoundException();
    }

    return this.productRepository.save({ ...product, name, price });
  }
}
