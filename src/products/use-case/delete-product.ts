import { InjectRepository } from '@nestjs/typeorm';

import { IDeleteProduct } from '../contracts/delete-product';
import { ProductNotFoundException } from '../exceptions/product-not-found';
import { ProductRepository } from '../product.repository';
import { GetProductByParam } from './get-product-by-params';

export class DeleteProduct implements IDeleteProduct {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private getProductByParam: GetProductByParam,
  ) {}

  async exec(params: IDeleteProduct.Params): IDeleteProduct.Response {
    const { id, user } = params;
    const product = await this.getProductByParam.exec({
      param: 'id',
      value: id,
    });
    if (!product) {
      throw new ProductNotFoundException();
    }

    product.user = user;

    await this.productRepository.softDelete(product.id);
    return { message: 'Product deleted' };
  }
}
