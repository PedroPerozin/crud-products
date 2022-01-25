import { mock, MockProxy } from 'jest-mock-extended';

import { EmailAlreadyExistsException } from '../../../src/user/exceptions/conflict-exception';
import { CreateUser } from '../../../src/user/use-cases/create-user';
import { GetUserByParam } from '../../../src/user/use-cases/get-user-by-param';
import { HashPassword } from '../../../src/user/use-cases/hash-password';
import { UserRepository } from '../../../src/user/user.repository';
import { UserEntityGenerator } from '../generators/user-entity-generator';

describe('CreateUser', () => {
  let mockUserRepository: MockProxy<UserRepository>;
  let mockHashPassword: MockProxy<HashPassword>;
  let mockGetUserByParam: MockProxy<GetUserByParam>;

  let sut: CreateUser;

  beforeEach(() => {
    mockUserRepository = mock();
    mockHashPassword = mock();
    mockGetUserByParam = mock();

    sut = new CreateUser(
      mockUserRepository,
      mockHashPassword,
      mockGetUserByParam,
    );
  });

  const params = {
    email: 'batman@sof.to',
    password: 'any_password',
    firstName: 'Bruce',
    lastName: 'Wayne',
  };

  it('should throw EmailAlreadyExistsException if user with provided email already registered', async () => {
    const { item: user } = UserEntityGenerator.generate();
    mockGetUserByParam.exec.mockResolvedValueOnce(user);
    await expect(sut.exec(params)).rejects.toThrow(EmailAlreadyExistsException);
    expect(mockGetUserByParam.exec).toHaveBeenCalledWith({
      param: 'email',
      value: params.email,
    });
    expect(mockGetUserByParam.exec).toHaveBeenCalledTimes(1);
  });

  it('should create an user on success', async () => {
    mockGetUserByParam.exec.mockResolvedValueOnce(null);
    const hashedPassword = 'hashed_password';
    mockHashPassword.exec.mockReturnValueOnce(hashedPassword);
    const { item: user } = UserEntityGenerator.generate();
    mockUserRepository.create.mockReturnValueOnce(user);
    mockUserRepository.save.mockResolvedValueOnce(user);
    await expect(sut.exec(params)).resolves.toBe(user);
    expect(mockGetUserByParam.exec).toHaveBeenCalledWith({
      param: 'email',
      value: params.email,
    });
    expect(mockGetUserByParam.exec).toHaveBeenCalledTimes(1);

    expect(mockUserRepository.create).toHaveBeenCalledWith({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      passwordHash: hashedPassword,
    });
    expect(mockUserRepository.create).toHaveBeenCalledTimes(1);

    expect(mockHashPassword.exec).toHaveBeenCalledWith({
      password: params.password,
    });
    expect(mockHashPassword.exec).toHaveBeenCalledTimes(1);

    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
  });
});
