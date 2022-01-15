import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateProductController } from './controllers/create-product';
import { ProductRepository } from './product.repository';
import { CreateProduct } from './use-case/create-product';
import { GetProductByParam } from './use-case/get-product-by-params';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([ProductRepository])],
  providers: [CreateProduct, GetProductByParam],
  exports: [CreateProduct, GetProductByParam],
  controllers: [CreateProductController],
})
export class ProductsModule {}
