import { InjectRepository } from '@nestjs/typeorm';
import { IDeleteProduct } from '../contracts';

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
      userId: user.id,
    });

    await this.productRepository.softDelete(product.id);
  }
}
