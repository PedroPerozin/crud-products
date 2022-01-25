import * as faker from 'faker';
import { v4 as uuid } from 'uuid';
import { ProductEntity } from '../../../src/products/entities/product.entity';
import { BaseGenerator, IGenerated } from '../../generators/base-generator';
import { CreateProductDtoParams } from '../../types/create-product-dto-params';

const productEntityGenerator = (
  params: CreateProductDtoParams | undefined,
): ProductEntity => {
  const productEntity = new ProductEntity();
  productEntity.id = uuid();
  productEntity.alternativeId = faker.random.number(999);
  productEntity.userId = params?.userId || uuid();
  productEntity.createdDate = new Date();
  productEntity.name = faker.commerce.productName();
  productEntity.price = faker.random.number(999);

  return productEntity;
};

export class ProductEntityGenerator extends BaseGenerator {
  public static generate(
    params?: CreateProductDtoParams,
    count = 1,
  ): IGenerated<ProductEntity> {
    return this.generator(() => productEntityGenerator(params), count);
  }
}
