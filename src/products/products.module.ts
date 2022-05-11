import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateProductController } from './controllers/create-product';
import { DeleteProductController } from './controllers/delete-product';
import { UpdateProductController } from './controllers/update-product';
import { ProductRepository } from './product.repository';
import { CreateProduct } from './use-case/create-product';
import { DeleteProduct } from './use-case/delete-product';
import { GetProductByParam } from './use-case/get-product-by-params';
import { UpdateProduct } from './use-case/update-product';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([ProductRepository])],
  providers: [CreateProduct, GetProductByParam, UpdateProduct, DeleteProduct],
  exports: [CreateProduct, GetProductByParam, UpdateProduct, DeleteProduct],
  controllers: [
    CreateProductController,
    UpdateProductController,
    DeleteProductController,
  ],
})
export class ProductsModule {}
