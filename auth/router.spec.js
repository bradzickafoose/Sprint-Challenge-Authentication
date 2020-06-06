const request = require('supertest');
const server = require('../api/server');

describe('when users register', () => {
    it('status code should be 201', async () => {
        const res = await request(server).post('/api/register')
            .send({
                "username": "Brad3",
                "password": "test"
            })
        expect(res.statusCode).toEqual(201);
    });

    it('response should be JSON', async () => {
        const res = await request(server).post('/api/register')
            .send({
                "username": "Brad",
                "password": "test"
            })
        expect(res.type).toMatch(/json/i);
    });
});

describe('when users login', () => {
    it('status code should be 200', async () => {
        const res = await request(server).post('/api/login')
            .send({
                "username": "test",
                "password": "test"
            })
        expect(res.statusCode).toEqual(200);
    });

    it('response should be JSON', async () => {
        const res = await request(server).post('/api/login')
            .send({
                "username": "test",
                "password": "test"
            })
        expect(res.type).toMatch(/json/i);
    });
});
