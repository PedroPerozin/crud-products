import {
  HttpStatus,
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'typeorm';

import { AppModule } from '../../../src/app.module';
import { TokenUnauthorizedException } from '../../../src/auth/exceptions';
import { ProductEntity } from '../../../src/products/entities/product.entity';
import { ProductNotFoundException } from '../../../src/products/exceptions/product-not-found';
import { UserEntity } from '../../../src/user/entities/user.entity';

describe('@DELETE /product/delete', () => {
  let app: INestApplication;
  let connection: Connection;
  let token: string;
  const baseUrl = `/products/delete/44db805d-7ac3-4a28-85f1-9a907e1eeb63`;
  const id = `44db805d-7ac3-4a28-85f1-9a907e1eeb63`;
  const wrongProductIdBaseUrl = `/products/delete/44db805d-7ac3-4a28-85f1-9a947e1eeb63`;

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
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

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

  it('should return Unauthorized if user is not authenticate', async () => {
    await request(app.getHttpServer())
      .delete(baseUrl)
      .send(id)
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
      .delete(baseUrl)
      .auth(token, { type: 'bearer' })
      .send(id)
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

  it('should return ProductNotFoundException if uuid is wrong ', async () => {
    await request(app.getHttpServer())
      .delete(wrongProductIdBaseUrl)
      .auth(token, { type: 'bearer' })
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.NOT_FOUND);
        expect(body.message).toStrictEqual(
          new ProductNotFoundException().message,
        );
      });
  });

  it('should delete a product with success ', async () => {
    let productId: string;
    await request(app.getHttpServer())
      .delete(baseUrl)
      .auth(token, { type: 'bearer' })
      .expect(({ status, body }) => {
        productId = body.id;
        expect(status).toBe(HttpStatus.OK);
        expect(body.message).toBeUndefined();
      });
    const [deletedProduct] = await connection
      .createQueryBuilder()
      .select('*')
      .from(ProductEntity, 'products')
      .where('products.id =:productId', { productId })
      .execute();
    expect(deletedProduct).toStrictEqual(undefined);
  });
});
