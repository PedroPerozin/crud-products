import { ConflictException } from '@nestjs/common';

export class ProductAlreadyExistsException extends ConflictException {
  constructor() {
    super('Conflict Exception.');
    this.name = 'ProductAlreadyExistsException';
  }
}
