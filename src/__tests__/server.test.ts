import myDefault from 'supertest';

const request = myDefault;

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('*', () => {
    describe('GET', () => {
      it('responds with 404 status', () => {
        return request(server)
        .get('/test')
        .expect(404);
      });
    });
  });
});
