import { mock, MockProxy } from 'jest-mock-extended';

import { ProductNotFoundException } from '../../../src/products/exceptions/product-not-found';
import { ProductRepository } from '../../../src/products/product.repository';
import { DeleteProduct } from '../../../src/products/use-case/delete-product';
import { GetProductByParam } from '../../../src/products/use-case/get-product-by-params';
import { UserEntityGenerator } from '../../user/generators/user-entity-generator';
import { ProductEntityGenerator } from '../generators/product-entity-generator';

describe('DeleteProduct', () => {
  let mockProductRepository: MockProxy<ProductRepository>;
  let mockGetProductByParam: MockProxy<GetProductByParam>;

  let sut: DeleteProduct;

  beforeEach(() => {
    mockProductRepository = mock();
    mockGetProductByParam = mock();

    sut = new DeleteProduct(mockProductRepository, mockGetProductByParam);
  });
  const { item: user } = UserEntityGenerator.generate();
  const { item: product } = ProductEntityGenerator.generate();

  const params = { id: product.id, user };

  it('should throw error if softDelete method throws', async () => {
    mockGetProductByParam.exec.mockResolvedValueOnce(product);
    mockProductRepository.softDelete.mockRejectedValueOnce(new Error());
    await expect(sut.exec(params)).rejects.toThrow(Error);

    expect(mockGetProductByParam.exec).toHaveBeenCalledWith({
      param: 'id',
      value: params.id,
      userId: params.user.id,
    });
    expect(mockGetProductByParam.exec).toHaveBeenCalledTimes(1);

    expect(mockProductRepository.softDelete).toHaveBeenCalledWith(params.id);
    expect(mockProductRepository.softDelete).toHaveBeenCalledTimes(1);
  });

  it('should throw ProductNotFoundException if product not found', async () => {
    mockGetProductByParam.exec.mockRejectedValueOnce(
      new ProductNotFoundException(),
    );

    await expect(sut.exec(params)).rejects.toThrow(ProductNotFoundException);

    expect(mockGetProductByParam.exec).toHaveBeenCalledWith({
      param: 'id',
      value: params.id,
      userId: params.user.id,
    });
    expect(mockGetProductByParam.exec).toHaveBeenCalledTimes(1);
  });

  it('should delete a existing product with success', async () => {
    mockGetProductByParam.exec.mockResolvedValueOnce(product);
    // mockGetProductByParam.exec.mockRejectedValueOnce(ProductNotFoundException);

    await expect(sut.exec(params)).resolves.toBeUndefined();

    expect(mockGetProductByParam.exec).toHaveBeenCalledWith({
      param: 'id',
      value: params.id,
      userId: params.user.id,
    });
    expect(mockGetProductByParam.exec).toHaveBeenCalledTimes(1);

    expect(mockProductRepository.softDelete).toHaveBeenCalledWith(product.id);
    expect(mockProductRepository.softDelete).toHaveBeenCalledTimes(1);
  });
});
