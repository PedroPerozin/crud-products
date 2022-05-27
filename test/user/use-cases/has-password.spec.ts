import { genSalt, hashSync } from 'bcryptjs';

import { HashPassword } from '../../../src/user/use-cases/hash-password';

jest.mock('bcryptjs');

const mockGenSaltBcrypt = jest.fn();
(genSalt as jest.Mock).mockImplementation(mockGenSaltBcrypt);

const mockHashSync = jest.fn();
(hashSync as jest.Mock).mockImplementation(mockHashSync);

const sut = new HashPassword();
const hashPassword = 'password';
const salt = 'salt';
const params = { password: '12344556' };

describe('HashPassword', () => {
  it('should return a hashed Password', () => {
    mockGenSaltBcrypt.mockReturnValueOnce(salt);
    mockHashSync.mockReturnValueOnce(hashPassword);

    expect(sut.exec(params)).toBe(hashPassword);
  });
});
