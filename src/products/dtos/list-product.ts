import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class ListProductDto {
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  pageSize: number;
  // limit
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  page: number;
  // offset
}
