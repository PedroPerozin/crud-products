import { UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('Invalid credentials.');
    this.name = 'InvalidCredentialsException';
  }
}
