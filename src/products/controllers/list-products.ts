import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginatedResults } from 'src/common/dtos/paginated-results.dto';
import { ListProductDto } from '../dtos/list-product';
import { ResponseReadProductsDto } from '../dtos/response-read-products';
import { ListProduct } from '../use-case/list-products';

@Controller('products')
export class ReadProductController {
  constructor(private listProduct: ListProduct) {}

  @UseGuards(JwtAuthGuard)
  @Get('/read')
  async handleReadProduct(@Query() listProductDto: ListProductDto) {
    const { page, pageSize } = listProductDto;
    const [products, count] = await this.listProduct.exec({
      ...listProductDto,
    });
    const parsedProducts = ResponseReadProductsDto.factory(
      ResponseReadProductsDto,
      products,
    );
    return new PaginatedResults(parsedProducts, count, page, pageSize);
  }
}
