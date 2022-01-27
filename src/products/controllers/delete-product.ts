import {
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { DeleteProduct } from '../use-case/delete-product';

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class DeleteProductController {
  constructor(private deleteProduct: DeleteProduct) {}

  @Delete('/delete/:id')
  async remove(@Request() req, @Param('id', ParseUUIDPipe) id: string) {
    const result = await this.deleteProduct.exec({
      id,
      user: req.user,
    });
    return result;
  }
}