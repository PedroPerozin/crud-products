import { mock } from 'jest-mock-extended';
import { MockProxy } from 'jest-mock-extended/lib/Mock';

import { ProductNotFoundException } from '../../../src/products/exceptions/product-not-found';
import { ProductRepository } from '../../../src/products/product.repository';
import { GetProductByParam } from '../../../src/products/use-case/get-product-by-params';
import { ProductEntityGenerator } from '../generators/product-entity-generator';

describe('GetProductByParam', () => {
  let mockProductRepository: MockProxy<ProductRepository>;
  let sut: GetProductByParam;

  beforeEach(() => {
    mockProductRepository = mock();

    sut = new GetProductByParam(mockProductRepository);
  });
  const { item: product } = ProductEntityGenerator.generate();
  const params = { param: 'name', value: 'product', userId: 'id' };
  const { param, value, userId } = params;

  it('should throw an exception ProductNotFoundException if product is not found', async () => {
    mockProductRepository.findOne.mockResolvedValueOnce(null);
    await expect(sut.exec(params)).rejects.toThrow(ProductNotFoundException);

    expect(mockProductRepository.findOne).toHaveBeenCalledWith({
      where: { [param]: value, userId },
    });
    expect(mockProductRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should return a Product on success', async () => {
    mockProductRepository.findOne.mockResolvedValueOnce(product);
    await expect(sut.exec(params)).resolves.toBe(product);

    expect(mockProductRepository.findOne).toHaveBeenCalledWith({
      where: { [param]: value, userId },
    });
    expect(mockProductRepository.findOne).toHaveBeenCalledTimes(1);
  });
});
