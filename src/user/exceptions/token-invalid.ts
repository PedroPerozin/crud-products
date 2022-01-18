import { UnauthorizedException } from '@nestjs/common';

export class TokenUnauthorizedException extends UnauthorizedException {
  constructor() {
    super('Token unauthorized.');
    this.name = 'tokenUnauthorizedException';
  }
}
