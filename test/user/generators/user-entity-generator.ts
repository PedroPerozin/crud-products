import { v4 as uuid } from 'uuid';
import * as faker from 'faker';
import { UserEntity } from '../../../src/user/entities/user.entity';
import { BaseGenerator, IGenerated } from '../../generators/base-generator';

const userEntityGenerator = (): UserEntity => {
  const userEntity = new UserEntity();
  userEntity.id = uuid();
  userEntity.alternativeId = faker.random.number(999);
  userEntity.createdDate = new Date();
  userEntity.firstName = faker.name.firstName();
  userEntity.lastName = faker.name.lastName();
  userEntity.email = faker.unique(faker.internet.email).toLowerCase();
  userEntity.passwordHash =
    '$2a$13$stA/btfvQjoNhOz3TG.V4uYZCskn9qUl95z8m5K.xp5fRhW0drGZ2'; // 123Change@

  return userEntity;
};

export class UserEntityGenerator extends BaseGenerator {
  public static generate(count = 1): IGenerated<UserEntity> {
    return this.generator(() => userEntityGenerator(), count);
  }
}
