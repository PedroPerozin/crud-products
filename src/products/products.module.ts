import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateProductController } from './controllers/create-product';
import { DeleteProductController } from './controllers/delete-producct';
import { ReadProductController } from './controllers/read-products';
import { UpdateProductController } from './controllers/update-product';
import { ProductRepository } from './product.repository';
import { CreateProduct } from './use-case/create-product';
import { DeleteProduct } from './use-case/delete-product';
import { GetProductByParam } from './use-case/get-product-by-params';
import { ReadProduct } from './use-case/read-products';
import { UpdateProduct } from './use-case/update-product';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([ProductRepository])],
  providers: [
    CreateProduct,
    GetProductByParam,
    UpdateProduct,
    DeleteProduct,
    ReadProduct,
  ],
  exports: [
    CreateProduct,
    GetProductByParam,
    UpdateProduct,
    DeleteProduct,
    ReadProduct,
  ],
  controllers: [
    CreateProductController,
    UpdateProductController,
    DeleteProductController,
    ReadProductController,
  ],
})
export class ProductsModule {}
