import { Expose } from 'class-transformer';
import { BaseDto } from '../../common/dtos/base.dto';

export class ResponseReadProductsDto extends BaseDto {
  @Expose()
  productId: string;

  @Expose()
  name: string;
}
