import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateProductDto } from '../dto/create-product';
import { ResponseCreateProductDto } from '../dto/response-create-product';
import { CreateProduct } from '../use-case/create-product';

@Controller('/products')
export class CreateProductController {
  constructor(private createProduct: CreateProduct) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Request() req,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ) {
    console.log(req.user);
    const result = await this.createProduct.exec({
      ...createProductDto,
      user: req.user,
    });
    return result;
  }
}
