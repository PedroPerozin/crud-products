import { mock, MockProxy } from 'jest-mock-extended';
import { InvalidCredentialsException } from '../../../src/auth/exceptions';
import {
  ValidatePassword,
  GenerateSignInCredentials,
  Login,
} from '../../../src/auth/use-cases';
import { GetUserByParam } from '../../../src/user/use-cases';
import { UserEntityGenerator } from '../../user/generators/user-entity-generator';

describe('Login', () => {
  let mockGetUserByParam: MockProxy<GetUserByParam>;
  let mockValidatePassword: MockProxy<ValidatePassword>;
  let mockGenerateSignInCredentials: MockProxy<GenerateSignInCredentials>;

  let sut: Login;

  beforeEach(() => {
    mockGetUserByParam = mock();
    mockValidatePassword = mock();
    mockGenerateSignInCredentials = mock();

    sut = new Login(
      mockGetUserByParam,
      mockValidatePassword,
      mockGenerateSignInCredentials,
    );
  });
  const { item: user } = UserEntityGenerator.generate();
  const accessToken = 'access-token';

  const params = {
    email: 'batman@sof.to',
    password: 'any_password',
  };

  it('should throw InvalidCredentialsException if user with provided was not found', async () => {
    mockGetUserByParam.exec.mockResolvedValueOnce(null);
    await expect(sut.exec(params)).rejects.toThrow(InvalidCredentialsException);

    expect(mockGetUserByParam.exec).toHaveBeenCalledWith({
      param: 'email',
      value: params.email,
    });
    expect(mockGetUserByParam.exec).toHaveBeenCalledTimes(1);
  });

  it('should return an user access-token on success', async () => {
    mockGetUserByParam.exec.mockResolvedValueOnce(user);
    mockValidatePassword.exec.mockResolvedValueOnce(true);
    mockGenerateSignInCredentials.exec.mockReturnValueOnce({ accessToken });

    await expect(sut.exec(params)).resolves.toStrictEqual({ accessToken });

    expect(mockGenerateSignInCredentials.exec).toHaveBeenCalledWith({ user });
    expect(mockGenerateSignInCredentials.exec).toHaveBeenCalledTimes(1);

    expect(mockValidatePassword.exec).toHaveBeenCalledWith({
      password: params.password,
      hash: user.passwordHash,
    });
    expect(mockValidatePassword.exec).toHaveBeenCalledTimes(1);

    expect(mockGetUserByParam.exec).toHaveBeenCalledWith({
      param: 'email',
      value: params.email,
    });
    expect(mockGetUserByParam.exec).toHaveBeenCalledTimes(1);
  });
});
