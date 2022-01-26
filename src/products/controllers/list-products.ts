import { Controller, Request, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PaginatedResults } from '../../common/dtos/paginated-results.dto';
import { FilterProductDto, ResponseReadProductsDto } from '../dtos';
import { ListProduct } from '../use-case/list-products';

@Controller('products')
export class ReadProductController {
  constructor(private listProduct: ListProduct) {}

  @UseGuards(JwtAuthGuard)
  @Get('/read')
  async handleReadProduct(
    @Request() req,
    @Query() filterProductDto: FilterProductDto,
  ) {
    const { page, pageSize, name, price, userId } = filterProductDto;
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
