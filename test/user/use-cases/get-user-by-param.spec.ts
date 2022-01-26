import { mock, MockProxy } from 'jest-mock-extended';

import { UserNotFoundException } from '../../../src/user/exceptions/user-not-found';
import { GetUserByParam } from '../../../src/user/use-cases/get-user-by-param';
import { UserRepository } from '../../../src/user/user.repository';
import { UserEntityGenerator } from '../generators/user-entity-generator';

describe('GetUserByParam', () => {
  let mockUserRepository: MockProxy<UserRepository>;

  let sut: GetUserByParam;

  beforeEach(() => {
    mockUserRepository = mock();
    sut = new GetUserByParam(mockUserRepository);
  });

  const { item: user } = UserEntityGenerator.generate();
  const params = { param: 'email', value: 'email@sof.to' };
  const { value, param } = params;

  it('should throw an exception UserNotFoundException if product is not found', async () => {
    mockUserRepository.findOne.mockResolvedValueOnce(null);
    await expect(sut.exec(params)).rejects.toThrow(UserNotFoundException);

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { [param]: value },
    });
    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should return an user on success', async () => {
    mockUserRepository.findOne.mockResolvedValueOnce(user);
    await expect(sut.exec(params)).resolves.toBe(user);

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { [param]: value },
    });

    expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
  });
});
