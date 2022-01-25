import { JwtService } from '@nestjs/jwt';
import { mock } from 'jest-mock-extended';
import { GenerateToken } from '../../../src/auth/use-cases/generate-token';

describe('GenerateToken', () => {
  const mockJwtService = mock<JwtService>();
  const sut = new GenerateToken(mockJwtService);
  const token = 'token';
  const payload = {
    email: 'test@sof.to',
    id: 'any_id',
  };

  it('should generate a token with correct params', async () => {
    mockJwtService.sign.mockReturnValueOnce(token);

    expect(sut.exec({ payload })).toBe(token);

    expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
    expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
  });
});
