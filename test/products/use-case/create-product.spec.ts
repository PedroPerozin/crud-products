import { mock } from 'jest-mock-extended';

import { ProductRepository } from '../../../src/products/product.repository';
import { CreateProduct } from '../../../src/products/use-case';
import { UserEntityGenerator } from '../../user/generators/user-entity-generator';
import { CreateProductDtoGenerator } from '../generators/create-products-dto.generators';
import { ProductEntityGenerator } from '../generators/product-entity-generator';

describe('CreateProduct', () => {
  const mockProductRepository = mock<ProductRepository>();

  const sut = new CreateProduct(mockProductRepository);

  const { item: createProductDto } = CreateProductDtoGenerator.generate();
  const { item: product } = ProductEntityGenerator.generate();
  const { item: user } = UserEntityGenerator.generate();
  const params = { ...createProductDto, user };

  it('should create a product', async () => {
    mockProductRepository.create.mockReturnValue(product);
    mockProductRepository.save.mockResolvedValueOnce(product);

    await expect(sut.exec(params)).resolves.toStrictEqual(product);

    expect(mockProductRepository.create).toHaveBeenCalledWith(params);
    expect(mockProductRepository.create).toHaveBeenCalledTimes(1);

    expect(mockProductRepository.save).toHaveBeenCalledWith(product);
    expect(mockProductRepository.save).toHaveBeenCalledTimes(1);
  });
});
