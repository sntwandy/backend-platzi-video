const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe('routes - movies', function() {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  });

  const request = testServer(route);

  describe('GET /movies', function() {
    it('Should respond with status 200', function(done) {
      request.get('/api/movies').expect(200, done);
    })

    it('Should respond with the list of the movie', function(done) {
      request.get('/get/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });
        done();
      });
    });
  });
});