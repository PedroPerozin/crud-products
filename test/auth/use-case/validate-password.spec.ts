import { compareSync } from 'bcryptjs';
import { InvalidCredentialsException } from '../../../src/auth/exceptions/invalid.credentials';
import { ValidatePassword } from '../../../src/auth/use-cases/validate-password';

jest.mock('bcryptjs');

describe('ValidatePassword', () => {
  let sut: ValidatePassword;
  let mockCompareSyncBcrypt;
  beforeEach(() => {
    // = mock();

    mockCompareSyncBcrypt = jest.fn();
    (compareSync as jest.Mock).mockImplementation(mockCompareSyncBcrypt);
    sut = new ValidatePassword();
  });

  const params = { password: 'password', hash: 'hash' };

  it('should throw InvalidCredentialsException if password is not valid', async () => {
    mockCompareSyncBcrypt.mockRejectedValueOnce(
      new InvalidCredentialsException(),
    );
    await expect(sut.exec(params)).rejects.toThrow(InvalidCredentialsException);

    expect(mockCompareSyncBcrypt).toHaveBeenCalledWith(
      params.password,
      params.hash,
    );
    expect(mockCompareSyncBcrypt).toHaveBeenCalledTimes(1);
  });
  it('should return true if password is valid', async () => {
    mockCompareSyncBcrypt.mockReturnValueOnce(true);

    await expect(sut.exec(params)).resolves.toBe(true);

    expect(mockCompareSyncBcrypt).toHaveBeenCalledWith(
      params.password,
      params.hash,
    );
    expect(mockCompareSyncBcrypt).toHaveBeenCalledTimes(1);
  });
});
