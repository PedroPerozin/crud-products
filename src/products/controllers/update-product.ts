import {
  Body,
  Request,
  Controller,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseUpdateProductDto } from '../dtos/response-update-products';
import { UpdateProductDto } from '../dtos/update-product';
import { UpdateProduct } from '../use-case/update-product';

@Controller('/products')
export class UpdateProductController {
  constructor(private updateProduct: UpdateProduct) {}
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async update(
    @Request() req,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ): Promise<ResponseUpdateProductDto> {
    const result = await this.updateProduct.exec({
      ...updateProductDto,
      user: req.user,
    });
    return ResponseUpdateProductDto.factory(ResponseUpdateProductDto, result);
  }
}
