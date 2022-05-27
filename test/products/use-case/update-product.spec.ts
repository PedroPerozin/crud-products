import { MockProxy, mock } from 'jest-mock-extended';
import { ProductNotFoundException } from '../../../src/products/exceptions/product-not-found';
import { ProductRepository } from '../../../src/products/product.repository';
import {
  GetProductByParam,
  UpdateProduct,
} from '../../../src/products/use-case';
import { UserEntityGenerator } from '../../user/generators/user-entity-generator';
import { ProductEntityGenerator } from '../generators/product-entity-generator';

describe('UpdateProduct', () => {
  let mockProductRepository: MockProxy<ProductRepository>;
  let mockGetProductByParam: MockProxy<GetProductByParam>;

  let sut: UpdateProduct;

  beforeEach(() => {
    mockProductRepository = mock();
    mockGetProductByParam = mock();

    sut = new UpdateProduct(mockProductRepository, mockGetProductByParam);
  });

  const { item: user } = UserEntityGenerator.generate();
  const params = {
    name: 'Test',
    price: 55,
    user,
    id: 'id',
  };
  const { item: product } = ProductEntityGenerator.generate();

  it('should throw error if save method throws ', async () => {
    mockGetProductByParam.exec.mockResolvedValueOnce(product);
    mockProductRepository.save.mockRejectedValueOnce(new Error());
    await expect(sut.exec(params)).rejects.toThrow(Error);

    // await expect(sut.exec(params)).rejects.toThrow(Error);

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

  it('should throw ProductNotFoundException if product not found', async () => {
    mockGetProductByParam.exec.mockRejectedValueOnce(
      new ProductNotFoundException(),
    );
    await expect(sut.exec(params)).rejects.toThrow(ProductNotFoundException);

    expect(mockGetProductByParam.exec).toHaveBeenCalledWith({
      param: 'id',
      value: params.id,
      userId: user.id,
    });
    expect(mockGetProductByParam.exec).toHaveBeenCalledTimes(1);
  });

  it('should update a product if everything is correct', async () => {
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
