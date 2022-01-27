import {
  HttpStatus,
  INestApplication,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'typeorm';

import { AppModule } from '../../../src/app.module';
import { TokenUnauthorizedException } from '../../../src/auth/exceptions';
import { ProductEntity } from '../../../src/products/entities/product.entity';
import { UserEntity } from '../../../src/user/entities/user.entity';

describe('@GET /products/read', () => {
  let app: INestApplication;
  let connection: Connection;
  let token: string;
  const baseUrl = `/products/read`;
  const paramsLogin = {
    id: '1d7b054b-2d78-4f16-a72d-3eae28c1deaa',
    email: 'admin@sof.to',
    password: 'perozin123',
  };
  const params = { pageSize: 10, page: 1 };
  const wrongParams = { pageSize: 10, page: 1, name: 5, price: 'oi' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post(`/auth/sign-in`)
      .send(paramsLogin)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.CREATED);
        token = body.accessToken;
      });

    connection = app.get(Connection);
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('should return Unauthorized if user does not authenticate', async () => {
    await request(app.getHttpServer())
      .get(baseUrl)
      .send()
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toStrictEqual(new UnauthorizedException().message);
      });
  });

  it('should return Unauthorized if no jwt token is provided but user not exist', async () => {
    await connection
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        deletedDate: new Date(),
      })
      .where('id =:id', { id: paramsLogin.id })
      .execute();

    await request(app.getHttpServer())
      .get(baseUrl)
      .auth(token, { type: 'bearer' })
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toStrictEqual(
          new TokenUnauthorizedException().message,
        );
      });

    await connection
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        deletedDate: null,
      })
      .where('id =:id', { id: paramsLogin.id })
      .execute();
  });

  it('should return InternalServerError if data is provided not pass on validate', async () => {
    await request(app.getHttpServer())
      .get(baseUrl)
      .query(wrongParams)
      .send()
      .auth(token, { type: 'bearer' })
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        // expect(body.message).toStrictEqual(
        //   new InternalServerErrorException().message,
        // );
      });
  });

  it('should return the products if everything is okay', async () => {
    let products = await connection
      .createQueryBuilder()
      .select('*')
      .from(ProductEntity, 'products')
      .offset((params.page - 1) * params.pageSize)
      .limit(params.pageSize)
      .execute();
    products = products.map((product: ProductEntity) => {
      return { name: product.name };
    });
    await request(app.getHttpServer())
      .get(baseUrl)
      .query(params)
      .auth(token, { type: 'bearer' })
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.OK);
        expect(body.rows).toStrictEqual(products);
      });
  });
});
