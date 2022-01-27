import { INestApplication, HttpStatus } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { AppModule } from '../../../src/app.module';
import * as request from 'supertest';
import { EmailAlreadyExistsException } from '../../../src/user/exceptions';
import * as faker from 'faker';
import { UserEntity } from '../../../src/user/entities/user.entity';

describe('@POST /create/user', () => {
  let app: INestApplication;
  let connection: Connection;
  const baseUrl = `/create/user`;

  const conflictUserParams = {
    firstName: 'Admin',
    lastName: 'Softo',
    email: 'admin@sof.to',
    password: 'perozin123',
  };
  const newUserParams = {
    firstName: `${faker.name.firstName()}`,
    lastName: `${faker.name.lastName()}`,
    email: `${faker.internet.email()}`,
    password: 'perozin123',
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = app.get(Connection);
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('should return EmailAlreadyExistsException if email already exists', async () => {
    await request(app.getHttpServer())
      .post(baseUrl)
      .send(conflictUserParams)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.CONFLICT);
        expect(body.message).toStrictEqual(
          new EmailAlreadyExistsException().message,
        );
      });
  });
  it('should return BadRequestException if data do not pass the validation pipe', async () => {
    await request(app.getHttpServer())
      .post(baseUrl)
      .send()
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.BAD_REQUEST);
        expect(body.message).toStrictEqual([
          'firstName must be a string',
          'firstName should not be empty',
          'lastName must be a string',
          'lastName should not be empty',
          'email must be an email',
          'email must be a string',
          'email should not be empty',
          'password must be shorter than or equal to 30 characters',
          'password must be longer than or equal to 8 characters',
          'password must be a string',
          'password should not be empty',
        ]);
      });
  });

  it('should create user if everything is okay', async () => {
    let userId: string;
    await request(app.getHttpServer())
      .post(baseUrl)
      .send(newUserParams)
      .expect(({ status, body }) => {
        userId = body.id;
        expect(status).toBe(HttpStatus.CREATED);

        expect(body.id).toBeDefined();
        expect(body.firstName).toBe(newUserParams.firstName);
        expect(body.lastName).toBe(newUserParams.lastName);
        expect(body.email).toBe(newUserParams.email);
      });
    const [user] = await connection
      .createQueryBuilder()
      .select('*')
      .from(UserEntity, 'users')
      .where('users.id =:userId', { userId })
      .execute();

    expect(user.firstname).toBe(newUserParams.firstName);
    expect(user.lastname).toBe(newUserParams.lastName);
    expect(user.email).toBe(newUserParams.email);
  });
});
