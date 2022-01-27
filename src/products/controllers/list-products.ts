import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PaginatedResults } from '../../common/dtos';
import { FilterProductDto, ResponseReadProductsDto } from '../dtos';
import { ListProduct } from '../use-case';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ReadProductController {
  constructor(private listProduct: ListProduct) {}

  @Get('/read')
  async handleReadProduct(
    @Request() req,
    @Query() filterProductDto: FilterProductDto,
  ) {
    const { page, pageSize } = filterProductDto;
    const [products, count] = await this.listProduct.exec({
      ...filterProductDto,
    });

    const parsedProducts = ResponseReadProductsDto.factory(
      ResponseReadProductsDto,
      products,
    );
    return new PaginatedResults(parsedProducts, count, page, pageSize);
  }
}
