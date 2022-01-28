import {
  INestApplication,
  HttpStatus,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../../../src/app.module';
import { TokenUnauthorizedException } from '../../../src/auth/exceptions';
import { ProductEntity } from '../../../src/products/entities/product.entity';
import { UserEntity } from '../../../src/user/entities/user.entity';

describe('@POST /products/create', () => {
  let app: INestApplication;
  let connection: Connection;
  let token: string;
  const baseUrl = `/products/create`;
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

  it('should return Unauthorized if no jwt token is provided', async () => {
    await request(app.getHttpServer())
      .post(baseUrl)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toStrictEqual(new UnauthorizedException().message);
      });
  });

  it('should return Unauthorized if no jwt token is provided but user not exist', async () => {
    // excluir o user (colocar uma data no delete), depois voltar ele (retornar null na data)
    await connection
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        deletedDate: new Date(),
      })
      .where('id =:id', { id: paramsLogin.id })
      .execute();
    await request(app.getHttpServer())
      .post(baseUrl)
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
      .post(baseUrl)
      .auth(token, { type: 'bearer' })
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

  it('should create a product on success ', async () => {
    let productId: string;
    const params = { name: 'Product', price: 55 };
    await request(app.getHttpServer())
      .post(baseUrl)
      .auth(token, { type: 'bearer' })
      .send(params)
      .expect(({ status, body }) => {
        expect(status).toBe(HttpStatus.CREATED);
        productId = body.id;
        expect(body.id).toBeDefined();
        expect(body.name).toBe(params.name);
        expect(body.price).toBe(params.price);
      });
    // preciso ver se realmente foi criado no banco
    // montar a query, para isso querybuilder
    const [product] = await connection
      .createQueryBuilder()
      .select('*')
      .from(ProductEntity, 'products')
      .where('products.id =:productId', { productId })
      .execute();
    // tenho que verificar se o que foi enviado é igual ao que foi salvo (testar db)

    expect(product.name).toBe(params.name);
    expect(Number(product.price)).toBe(params.price);
    expect(product.userid).toBe(paramsLogin.id);
  });
});
