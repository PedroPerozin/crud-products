import { Expose } from 'class-transformer';
import { BaseDto } from '../../common/dtos';

export class ResponseReadProductsDto extends BaseDto {
  @Expose()
  productId: string;

  @Expose()
  name: string;
}
