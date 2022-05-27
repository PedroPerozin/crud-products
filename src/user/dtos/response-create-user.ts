import { Expose } from 'class-transformer';

import { BaseDto } from '../../common/dtos';

export class ResponseCreateUserDto extends BaseDto {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  id: string;

  @Expose({
    name: 'fullName',
  })
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
