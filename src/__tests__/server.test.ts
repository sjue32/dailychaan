import myDefault from 'supertest';

const request = myDefault;

const server = 'http://localhost:3000';

describe.skip('Route integration', () => {
  describe('*', () => {
    describe('GET', () => {
      it('responds with 404 status', () => {
        return request(server)
        .get('/test')
        .expect('Content-Type', /text\/html/)
        .expect(404);
      });
    });
  });
});

describe.skip('Error handler', () => {
  describe('GET', () => {
    it('responds with 418 status and error message', () => {
      return request(server)
      .get('/error')
      .expect(418)
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({ err: 'This is a test of global error handler'});
      });
    });
  });
});

