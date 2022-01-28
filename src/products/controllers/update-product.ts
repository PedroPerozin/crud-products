import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ResponseUpdateProductDto, UpdateProductDto } from '../dtos';
import { UpdateProduct } from '../use-case';

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class UpdateProductController {
  constructor(private updateProduct: UpdateProduct) {}
  @Put('/update/:id')
  async update(
    @Request() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
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
