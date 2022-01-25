import { mock } from 'jest-mock-extended';
import { resolve } from 'path/posix';
import { ProductNotFoundException } from '../../../src/products/exceptions/product-not-found';

import { ProductRepository } from '../../../src/products/product.repository';
import { GetProductByParam } from '../../../src/products/use-case/get-product-by-params';
import { UpdateProduct } from '../../../src/products/use-case/update-product';
import { UserEntity } from '../../../src/user/entities/user.entity';
import { UserEntityGenerator } from '../../user/generators/user-entity-generator';
import { ProductEntityGenerator } from '../generators/product-entity-generator';

describe('UpdateProduct', () => {
  const mockProductRepository = mock<ProductRepository>();
  const mockGetProductByParam = mock<GetProductByParam>();

  const sut = new UpdateProduct(mockProductRepository, mockGetProductByParam);

  it('should update a product if everything is correct', async () => {
    const { item: product } = ProductEntityGenerator.generate();
    const { item: user } = UserEntityGenerator.generate();
    const params = {
      name: 'Teste',
      price: 55,
      user,
      id: 'id',
    };
    mockGetProductByParam.exec.mockResolvedValueOnce(product);
    mockProductRepository.save.mockResolvedValueOnce(product);
    await expect(sut.exec(params)).resolves.toBe(product);

    expect(mockGetProductByParam.exec).toHaveBeenCalledWith({
      param: 'id',
      value: params.id,
      userId: user.id,
    });
    expect(mockGetProductByParam.exec).toHaveBeenCalledTimes(1);

    expect(mockProductRepository.save).toHaveBeenCalledWith({
      ...product,
      name: params.name,
      price: params.price,
    });
    expect(mockProductRepository.save).toHaveBeenCalledTimes(1);
  });
});
