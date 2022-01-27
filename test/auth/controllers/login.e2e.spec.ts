import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import * as request from 'supertest';

import { AppModule } from '../../../src/app.module';
import { InvalidCredentialsException } from '../../../src/auth/exceptions';

describe('@POST /auth/sign-in', () => {
  let app: INestApplication;
  const baseUrl = `/auth/sign-in`;

  const paramsLogin = {
    id: '1d7b054b-2d78-4f16-a72d-3eae28c1deaa',
    email: 'admin@sof.to',
    password: 'perozin123',
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('should return BadRequestException if data do not pass the validation pipe', async () => {
    await request(app.getHttpServer())
      .post(baseUrl)
      .send()
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.BAD_REQUEST);
        expect(body.message).toStrictEqual([
          'email must be an email',
          'email must be a string',
          'email should not be empty',
          'password must be a string',
          'password should not be empty',
        ]);
      });
  });

  it('should return InvalidCredentialsException if the password is wrong', async () => {
    const params = { email: 'admin@sof.to', password: 'teste' };
    await request(app.getHttpServer())
      .post(baseUrl)
      .send(params)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toStrictEqual(
          new InvalidCredentialsException().message,
        );
      });
  });

  it('should return InvalidCredentialsException if the user does not exist', async () => {
    const params = {
      email: faker.internet.email().toLowerCase(),
      password: 'teste',
    };
    await request(app.getHttpServer())
      .post(baseUrl)
      .send(params)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toStrictEqual(
          new InvalidCredentialsException().message,
        );
      });
  });

  it('should return an access token if everything is okay', async () => {
    await request(app.getHttpServer())
      .post(baseUrl)
      .send(paramsLogin)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.CREATED);
        expect(body.accessToken).toBeDefined();
      });
  });
});
