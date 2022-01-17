import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/dtos/base.dto';

export class ResponseCreateProductDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  id: string;

  @Expose({
    name: 'product',
  })
  getProduct() {
    return `${this.name} - Valor: ${this.price}`;
  }
}
