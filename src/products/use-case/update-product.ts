import { InjectRepository } from '@nestjs/typeorm';

import { IUpdateProduct } from '../contracts/update-product';
import { ProductRepository } from '../product.repository';
import { GetProductByParam } from './get-product-by-params';

export class UpdateProduct implements IUpdateProduct {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private getProductByParam: GetProductByParam,
  ) {}

  async exec(params: IUpdateProduct.Params): IUpdateProduct.Response {
    const { name, price, user, id } = params;

    const product = await this.getProductByParam.exec({
      param: 'id',
      value: id,
      userId: user.id,
    });

    return this.productRepository.save({ ...product, name, price });
  }
}
