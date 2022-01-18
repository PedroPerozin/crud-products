import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/dtos/base.dto';

export class ResponseUpdateProductDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  id: string;
}
