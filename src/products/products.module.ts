import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateProductController } from './controllers/create-product';
import { UpdateProductController } from './controllers/update-product';
import { ProductRepository } from './product.repository';
import { CreateProduct } from './use-case/create-product';
import { GetProductByParam } from './use-case/get-product-by-params';
import { UpdateProduct } from './use-case/update-product';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([ProductRepository])],
  providers: [CreateProduct, GetProductByParam, UpdateProduct],
  exports: [CreateProduct, GetProductByParam, UpdateProduct],
  controllers: [CreateProductController, UpdateProductController],
})
export class ProductsModule {}
