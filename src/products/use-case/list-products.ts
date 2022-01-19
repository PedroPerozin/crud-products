import { InjectRepository } from '@nestjs/typeorm';
import { IFilterProduct } from '../contracts/list-product';
import { ProductRepository } from '../product.repository';

export class ListProduct implements IFilterProduct {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async exec(params: IFilterProduct.Params): IFilterProduct.Response {
    const { pageSize, page, name, price, userId } = params;

    return this.productRepository.readProduct(
      pageSize,
      page,
      name,
      price,
      userId,
    );
  }
}
