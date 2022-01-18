import {
  Body,
  Request,
  Controller,
  Put,
  UseGuards,
  ValidationPipe,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseUpdateProductDto } from '../dtos/response-update-products';
import { UpdateProductDto } from '../dtos/update-product';
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
      ...updateProductDto,
      user: req.user,
    });
    return ResponseUpdateProductDto.factory(ResponseUpdateProductDto, result);
  }
}
