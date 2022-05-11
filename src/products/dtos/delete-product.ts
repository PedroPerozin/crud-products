import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteProductDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
