import { ConflictException } from '@nestjs/common';

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super('Conflict Exception.');
    this.name = 'EmailAlreadyExistsException';
  }
}
