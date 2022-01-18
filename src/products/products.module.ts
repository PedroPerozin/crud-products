import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateProductController } from './controllers/create-product';
import { DeleteProductController } from './controllers/delete-producct';
import { ReadProductController } from './controllers/list-products';
import { UpdateProductController } from './controllers/update-product';
import { ProductRepository } from './product.repository';
import { CreateProduct } from './use-case/create-product';
import { DeleteProduct } from './use-case/delete-product';
import { GetProductByParam } from './use-case/get-product-by-params';
import { ListProduct } from './use-case/list-products';
import { UpdateProduct } from './use-case/update-product';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [
    CreateProduct,
    GetProductByParam,
    UpdateProduct,
    DeleteProduct,
    ListProduct,
  ],
  exports: [],
  controllers: [
    CreateProductController,
    UpdateProductController,
    DeleteProductController,
    ReadProductController,
  ],
})
export class ProductsModule {}
