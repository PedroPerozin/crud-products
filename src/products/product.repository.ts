import { EntityRepository, Repository } from 'typeorm';
import { IFilterProduct } from './contracts';

import { ProductEntity } from './entities/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  async readProduct(
    params: IFilterProduct.Params,
  ): Promise<[ProductEntity[], number]> {
    const { pageSize, page, name, price, userId, sortBy } = params;

    const query = this.createQueryBuilder('products');
    query.skip((page - 1) * pageSize);
    query.take(pageSize);

    if (sortBy) {
      const [field, sortDirection] = <[string, 'ASC' | 'DESC']>(
        sortBy.split('.')
      );
      query.orderBy(`products.${field}`, sortDirection);
    }

    if (userId) {
      query.where('products.userid =:userId', { userId });
    }

    if (name) {
      query.andWhere('products.name ilike :name', { name: `%${name}%` });
    }

    if (price) {
      query.andWhere('products.price =:price', { price });
    }

    return query.getManyAndCount();
  }
}
