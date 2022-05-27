import { Expose } from 'class-transformer';
import { BaseDto } from '../../common/dtos';

export class ResponseUpdateProductDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  id: string;
}
