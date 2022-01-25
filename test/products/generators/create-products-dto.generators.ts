import * as faker from 'faker';
import { CreateProductDto } from '../../../src/products/dtos/create-product';
import { BaseGenerator, IGenerated } from '../../generators/base-generator';

const createProductDtoGenerator = (): CreateProductDto => {
  const createProductDto = new CreateProductDto();
  createProductDto.name = faker.commerce.productName();
  createProductDto.price = faker.datatype.number(999);
  return createProductDto;
};

export class CreateProductDtoGenerator extends BaseGenerator {
  public static generate(count = 1): IGenerated<CreateProductDto> {
    return this.generator(() => createProductDtoGenerator(), count);
  }
}
