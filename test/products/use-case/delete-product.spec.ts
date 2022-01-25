import { mock } from 'jest-mock-extended';
import { ProductNotFoundException } from '../../../src/products/exceptions/product-not-found';

import { ProductRepository } from '../../../src/products/product.repository';
import { DeleteProduct } from '../../../src/products/use-case/delete-product';
import { GetProductByParam } from '../../../src/products/use-case/get-product-by-params';
import { UserEntity } from '../../../src/user/entities/user.entity';
import { ProductEntityGenerator } from '../generators/product-entity-generator';

describe('DeleteProduct', () => {
  const mockProductRepository = mock<ProductRepository>();
  const mockGetProductByParam = mock<GetProductByParam>();

  const sut = new DeleteProduct(mockProductRepository, mockGetProductByParam);

  it('should delete a existing product with success', async () => {
    const { item: product } = ProductEntityGenerator.generate();

    mockGetProductByParam.exec.mockResolvedValueOnce(product);
    mockGetProductByParam.exec.mockRejectedValueOnce(ProductNotFoundException);

    // add no generator
    const params = { id: product.id, user: new UserEntity() };

    // const resultado = await sut.exec(params);

    await expect(sut.exec(params)).resolves.toBeUndefined();
    expect(mockGetProductByParam.exec).toHaveBeenCalledWith({
      param: 'id',
      value: params.id,
      userId: params.user.id,
    });
    expect(mockProductRepository.softDelete).toHaveBeenCalledWith(product.id);
  });
});
