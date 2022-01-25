import { mock } from 'jest-mock-extended';
import { ProductNotFoundException } from '../../../src/products/exceptions/product-not-found';
import { ProductRepository } from '../../../src/products/product.repository';
import { GetProductByParam } from '../../../src/products/use-case/get-product-by-params';
import { ProductEntityGenerator } from '../generators/product-entity-generator';

describe('GetProductByParam', () => {
  const mockProductRepository = mock<ProductRepository>();
  const sut = new GetProductByParam(mockProductRepository);

  it('should return a ProductNotFoundException if product is not found', async () => {
    mockProductRepository.findOne.mockResolvedValueOnce(null);
    const params = { param: 'name', value: 'product', userId: 'id' };
    await expect(sut.exec(params)).rejects.toThrow(ProductNotFoundException);
    const { param, value, userId } = params;
    expect(mockProductRepository.findOne).toHaveBeenCalledWith({
      where: { [param]: value, userId },
    });
  });

  it('should return a Product on success', async () => {
    const { item: product } = ProductEntityGenerator.generate();
    mockProductRepository.findOne.mockResolvedValueOnce(product);
    const params = { param: 'name', value: 'product', userId: 'id' };
    await expect(sut.exec(params)).resolves.toBe(product);
    const { param, value, userId } = params;
    expect(mockProductRepository.findOne).toHaveBeenCalledWith({
      where: { [param]: value, userId },
    });
  });
});
