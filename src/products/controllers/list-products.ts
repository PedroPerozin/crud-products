import {
  Controller,
  Request,
  Get,
  Query,
  UseGuards,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginatedResults } from 'src/common/dtos/paginated-results.dto';
import { FilterProductDto } from '../dtos';
import { ResponseReadProductsDto } from '../dtos/response-read-products';
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
