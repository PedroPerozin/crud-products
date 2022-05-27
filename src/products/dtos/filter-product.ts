import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { QueryPaginatedDto } from '../../common/dtos';

export class FilterProductDto extends QueryPaginatedDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
