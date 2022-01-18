import { InjectRepository } from '@nestjs/typeorm';

import { IGetProductByParam } from '../contracts/get-products-by-param';
import { ProductNotFoundException } from '../exceptions/product-not-found';
import { ProductRepository } from '../product.repository';

export class GetProductByParam implements IGetProductByParam {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
  async exec(params: IGetProductByParam.Params): IGetProductByParam.Response {
    const { param, value } = params;
    const foundProduct = await this.productRepository.findOne({
      where: { [param]: value },
    });

    if (!foundProduct) {
      throw new ProductNotFoundException();
    }

    return foundProduct;
  }
}
// TODO -> buscar pelo usuário
