import { mock } from 'jest-mock-extended';
import { ProductRepository } from '../../../src/products/product.repository';
import { CreateProduct } from '../../../src/products/use-case/create-product';
import { UserEntity } from '../../../src/user/entities/user.entity';

import { CreateProductDtoGenerator } from '../generators/create-products-dto.generators';
import { ProductEntityGenerator } from '../generators/product-entity-generator';

describe('CreateProduct', () => {
  const mockProductRepository = mock<ProductRepository>();

  const sut = new CreateProduct(mockProductRepository);

  it('should create a product', async () => {
    const { item: createProductDto } = CreateProductDtoGenerator.generate();
    const { item: product } = ProductEntityGenerator.generate();
    mockProductRepository.create.mockReturnValue(product);
    mockProductRepository.save.mockResolvedValueOnce(product);

    const params = { ...createProductDto, user: new UserEntity() };

    await expect(sut.exec(params)).resolves.toStrictEqual(product);

    expect(mockProductRepository.create).toHaveBeenCalledWith(params);
  });
});
