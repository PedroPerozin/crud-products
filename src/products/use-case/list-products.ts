import { InjectRepository } from '@nestjs/typeorm';
import { IListProduct } from '../contracts/list-product';
import { ProductRepository } from '../product.repository';

export class ListProduct implements IListProduct {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async exec(params: IListProduct.Params): IListProduct.Response {
    const { pageSize, page } = params;

    return this.productRepository.readProduct(pageSize, page);
  }
}
// TODO -> Alterar o nome de read para list
// TODO -> Fazer os filtros de listagem (preco, nome, user)
