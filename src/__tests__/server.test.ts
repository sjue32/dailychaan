import request from 'supertest';
import { app } from '../server/test_server';

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('*', () => {
    describe('GET', () => {
      it('responds with 404 status', () => {
        return request(app)
        .get('/test')
        .expect('Content-Type', /text\/html/)
        .expect(404);
      });
    });
  });
});

describe('Error handler', () => {
  describe('GET', () => {
    it('responds with 418 status and error message', () => {
      return request(app)
      .get('/error')
      .expect(418)
      .then(res => {
        console.log('Testing global error handler', res.body);
        expect(res.body).toEqual({ err: 'This is a test of global error handler'});
      });
    });
  });
});

describe('Requests', () => {
  describe('GET /api/users', () => {
    // should we be awaiting the execution of request(app)???
    it('', async () => {
      return request(app)
      .get('/api/posts')
      // .expect('Content-Type', /json/)
      .send({
        test: true,
      })
      .expect(200)
      .then((res) => {
        const posts = res.body;
        expect(Array.isArray(posts)).toBe(true);
        expect(posts[0].user_id).toEqual(1);
      });
    });
  })
});

