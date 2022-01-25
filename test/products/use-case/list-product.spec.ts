import { mock } from 'jest-mock-extended';
import { ProductEntity } from '../../../src/products/entities/product.entity';
import { ProductRepository } from '../../../src/products/product.repository';
import { ListProduct } from '../../../src/products/use-case/list-products';
import { UserEntityGenerator } from '../../user/generators/user-entity-generator';
import { ProductEntityGenerator } from '../generators/product-entity-generator';

describe('CreateProduct', () => {
  const mockProductRepository = mock<ProductRepository>();
  const sut = new ListProduct(mockProductRepository);
  const { item: user } = UserEntityGenerator.generate();
  const { item: product } = ProductEntityGenerator.generate();
  const { item: product2 } = ProductEntityGenerator.generate();
  const products: [ProductEntity[], number] = [[product, product2], 2];

  const params = {
    name: 'Test',
    page: 1,
    pageSize: 10,
    price: 55,
    userId: user.id,
  };

  it('should return a list of products if everything is correct', async () => {
    mockProductRepository.readProduct.mockResolvedValueOnce(products);
    await expect(sut.exec(params)).resolves.toBe(products);

    expect(mockProductRepository.readProduct).toHaveBeenCalledWith(
      params.pageSize,
      params.page,
      params.name,
      params.price,
      params.userId,
    );
    expect(mockProductRepository.readProduct).toHaveBeenCalledTimes(1);
  });
});
