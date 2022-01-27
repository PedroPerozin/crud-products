import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateProductDto, ResponseCreateProductDto } from '../dtos';

import { CreateProduct } from '../use-case/create-product';

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class CreateProductController {
  constructor(private createProduct: CreateProduct) {}

  @Post('/create')
  async create(
    @Request() req,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<ResponseCreateProductDto> {
    const result = await this.createProduct.exec({
      ...createProductDto,
      user: req.user,
    });
    return ResponseCreateProductDto.factory(ResponseCreateProductDto, result);
  }
}
