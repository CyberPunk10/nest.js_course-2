import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';

const liginDto: AuthDto = {
  login: 'test21@test.com',
  password: 'password',
}

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(liginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST) - fail - incorrect password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...liginDto, password: 'incorrect password' })
      .expect(401, {
        statusCode: 401,
        message: 'Wrong password',
        error: 'Unauthorized'
      });
  });

  it('/auth/login (POST) - fail', async () => {
    const isNotExistEmail = 'isNotExist@email.com';
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...liginDto, login: isNotExistEmail })
      .expect(401, {
        statusCode: 401,
        message: `User with ${isNotExistEmail} is not authorized`,
        error: 'Unauthorized'
      });
  });

  afterAll(() => {
    disconnect();
  })
});
