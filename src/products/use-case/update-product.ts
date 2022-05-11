import { InjectRepository } from '@nestjs/typeorm';
import { IUpdateProduct } from '../contracts/update-products';
import { ProductNotFoundException } from '../exceptions/product-not-found';
import { ProductRepository } from '../product.repository';
import { GetProductByParam } from './get-product-by-params';

export class UpdateProduct implements IUpdateProduct {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private getProductByParams: GetProductByParam,
  ) {}

  async exec(params: IUpdateProduct.Params): IUpdateProduct.Response {
    const { name, price, id, user } = params;

    const product = await this.getProductByParams.exec({
      param: 'id',
      value: id,
    });
    if (!product) {
      throw new ProductNotFoundException();
    }

    product.name = name;
    product.price = price;
    product.user = user;

    return this.productRepository.save(product);
  }
}
