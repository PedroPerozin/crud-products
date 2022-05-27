import { mock, MockProxy } from 'jest-mock-extended';
import {
  GenerateSignInCredentials,
  GenerateToken,
} from '../../../src/auth/use-cases';
import { UserEntityGenerator } from '../../user/generators/user-entity-generator';

describe('GenerateSignInCredentials', () => {
  let mockGenerateToken: MockProxy<GenerateToken>;

  let sut: GenerateSignInCredentials;
  beforeEach(() => {
    mockGenerateToken = mock();
    sut = new GenerateSignInCredentials(mockGenerateToken);
  });

  const { item: user } = UserEntityGenerator.generate();
  const payload = { id: user.id, email: user.email };

  it('should generate user credentials with', () => {
    const accessToken = 'access-token';
    mockGenerateToken.exec.mockReturnValueOnce(accessToken);

    expect(sut.exec({ user })).toStrictEqual({ accessToken });

    expect(mockGenerateToken.exec).toHaveBeenCalledWith({ payload });
    expect(mockGenerateToken.exec).toHaveBeenCalledTimes(1);
  });
});
