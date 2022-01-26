import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateProductDto, ResponseUpdateProductDto } from '../dtos';

import { UpdateProduct } from '../use-case/update-product';

@Controller('/products')
export class UpdateProductController {
  constructor(private updateProduct: UpdateProduct) {}
  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async update(
    @Request() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe)
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseUpdateProductDto> {
    const result = await this.updateProduct.exec({
      id,
      ...updateProductDto,
      user: req.user,
    });
    return ResponseUpdateProductDto.factory(ResponseUpdateProductDto, result);
  }
}
