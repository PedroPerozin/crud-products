import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginatedResults } from 'src/common/dtos/paginated-results.dto';
import { ReadProductDto } from '../dtos/read-product';
import { ResponseReadProductsDto } from '../dtos/response-read-products';
import { ReadProduct } from '../use-case/read-products';

@Controller('products')
export class ReadProductController {
  constructor(private readProduct: ReadProduct) {}

  @UseGuards(JwtAuthGuard)
  @Get('/read')
  async handleReadProduct(@Query() readProductDto: ReadProductDto) {
    const { page, pageSize } = readProductDto;
    console.log(readProductDto);
    console.log('readProductDto');
    const [products, count] = await this.readProduct.exec({
      ...readProductDto,
    });

    console.log(readProductDto);
    const parsedProducts = ResponseReadProductsDto.factory(
      ResponseReadProductsDto,
      products,
    );
    return new PaginatedResults(parsedProducts, count, page, pageSize);
  }
}
