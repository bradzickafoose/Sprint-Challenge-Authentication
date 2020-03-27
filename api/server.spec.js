const request = require('supertest');
const server = require('./server');

describe('server.js', function () {

    describe('environment', function () {

        it('should say environment is testing', function () {
            expect(process.env.DB_ENV).toBe('testing')
        });

    });

});