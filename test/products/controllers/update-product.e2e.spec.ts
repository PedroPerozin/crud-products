import {
  HttpStatus,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import * as request from 'supertest';
import { Connection } from 'typeorm';

import { AppModule } from '../../../src/app.module';
import { ProductEntity } from '../../../src/products/entities/product.entity';
import { ProductNotFoundException } from '../../../src/products/exceptions/product-not-found';
import { UserEntity } from '../../../src/user/entities/user.entity';

describe('@PUT /products/update', () => {
  let app: INestApplication;
  let connection: Connection;
  let token: string;
  const baseUrl = `/products/update/44db805d-7ac3-4a28-85f1-9a907e1eeb63`;
  const wrongIdBaseUrl = `/products/update/44db805d-7ac3-4a28-85f1-9a947e1eeb63`;
  const productParams = {
    name: `${faker.commerce.productName()}`,
    price: 55,
  };
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
      .put(baseUrl)
      .send(productParams)
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
      .put(baseUrl)
      .send(productParams)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toStrictEqual(new UnauthorizedException().message);
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

  it('should return BadRequest if data provided not pass on validate', async () => {
    await request(app.getHttpServer())
      .put(baseUrl)
      .auth(token, { type: 'bearer' })
      .send()
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.BAD_REQUEST);
        expect(body.message).toStrictEqual([
          'name should not be empty',
          'name must be a string',
          'price should not be empty',
          'price must be a number conforming to the specified constraints',
        ]);
      });
  });

  it('should return ProductNotFoundException if uuid is wrong', async () => {
    await request(app.getHttpServer())
      .put(wrongIdBaseUrl)
      .auth(token, { type: 'bearer' })
      .send(productParams)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.NOT_FOUND);
        expect(body.message).toStrictEqual(
          new ProductNotFoundException().message,
        );
      });
  });

  it('should update a product on success  ', async () => {
    let productId: string;
    await request(app.getHttpServer())
      .put(baseUrl)
      .auth(token, { type: 'bearer' })
      .send(productParams)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.OK);
        productId = body.id;
        expect(body.id).toBeDefined();
        expect(body.name).toBe(productParams.name);
        expect(body.price).toBe(productParams.price);
      });

    const [product] = await connection
      .createQueryBuilder()
      .select('*')
      .from(ProductEntity, 'products')
      .where('products.id =:productId', { productId })
      .execute();
    expect(product.name).toBe(productParams.name);
    expect(Number(product.price)).toBe(productParams.price);
    expect(product.userid).toBe(paramsLogin.id);
  });
});
