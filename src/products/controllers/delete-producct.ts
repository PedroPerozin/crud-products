import { Controller, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { DeleteProduct } from '../use-case/delete-product';

@Controller('/products')
export class DeleteProductController {
  constructor(private deleteProduct: DeleteProduct) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async remove(
    @Request() req,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    const result = await this.deleteProduct.exec({
      id,
      user: req.user,
    });
    console.log(result);
    return result;
  }
}
