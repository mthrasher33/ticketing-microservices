import request from 'supertest';
import { app } from '../../app';

const route = '/api/users/signup';

it('returns a 201 on sueccessful signup', async () => {
  return request(app)
    .post(route)
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post(route)
    .send({
      email: 'invalidEmail@format',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post(route)
    .send({
      email: 'test@test.com',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app).post(route).send({ email: 'test@test.com' }).expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post(route)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post(route)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post(route)
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
