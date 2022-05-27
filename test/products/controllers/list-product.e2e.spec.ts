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
  const params = {
    pageSize: 10,
    page: 1,
  };
  const filterParams = {
    userId: '1d7b054b-2d78-4f16-a72d-3eae28c1deaa',
    name: 'Product01',
    price: 53.54,
  };

  const orderByParams = {
    field: 'name',
  };
  const wrongParams = {
    userId: 123,
    name: 123,
    price: 'asd',
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

  it('should return BadRequest if data is provided not pass on validate', async () => {
    await request(app.getHttpServer())
      .get(baseUrl)
      .query(wrongParams)
      .auth(token, { type: 'bearer' })
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.BAD_REQUEST);
        expect(body.message).toStrictEqual([
          'price must be a number conforming to the specified constraints',
          'userId must be a UUID',
        ]);
      });
  });

  it('should return the products paginated if everything is okay', async () => {
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
      .auth(token, { type: 'bearer' })
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.OK);
        expect(body.rows).toStrictEqual(products);
      });
  });

  it('should return the products filtered if everything is okay', async () => {
    let filterProducts = await connection
      .createQueryBuilder()
      .from(ProductEntity, 'products')
      .where('products.userid =:userId', { userId: filterParams.userId })
      .andWhere('products.name ilike :name', { name: filterParams.name })
      .andWhere('products.price =:price', { price: filterParams.price })
      .execute();
    filterProducts = filterProducts.map((product: ProductEntity) => {
      return { name: product.name };
    });
    console.log('filterProducts', filterProducts);
    await request(app.getHttpServer())
      .get(
        `${baseUrl}?name=${filterParams.name}&userid=${filterParams.userId}&price=${filterParams.price}`,
      )
      .auth(token, { type: 'bearer' })
      .expect(({ status, body }) => {
        console.log('body', body);
        expect(status).toBe(HttpStatus.OK);
        expect(body.rows).toStrictEqual(filterProducts);
      });
  });

  it('should return the products sortBy ASC if everything is okay', async () => {
    let listProducts = await connection
      .createQueryBuilder()
      .select('*')
      .from(ProductEntity, 'products')
      .execute();

    listProducts = listProducts.sort((a, b) => a.name.localeCompare(b.name));
    const orderProducts = listProducts.map((product: ProductEntity) => {
      return { name: product.name };
    });
    await request(app.getHttpServer())
      .get(`${baseUrl}?sortBy=${orderByParams.field}.ASC`)
      .auth(token, { type: 'bearer' })
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.OK);
        expect(body.rows).toStrictEqual(orderProducts);
      });
  });
});
