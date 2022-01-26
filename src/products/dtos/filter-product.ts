import { Type } from 'class-transformer';
import { IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryPaginatedDto } from '../../common/dtos/query-paginated.dto';

export class FilterProductDto extends QueryPaginatedDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
