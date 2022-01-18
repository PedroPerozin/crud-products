import { EntityRepository, Repository } from 'typeorm';

import { ProductEntity } from './entities/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  async readProduct(
    pageSize: number,
    page: number,
  ): Promise<[ProductEntity[], number]> {
    const query = this.createQueryBuilder('products');
    query.skip((page - 1) * pageSize);
    query.take(pageSize);
    return query.getManyAndCount();
  }
}
