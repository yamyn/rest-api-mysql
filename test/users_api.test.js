const request = require('supertest');
const app = require('../src/server/server');
const dbService = require('../src/components/User/services/tableService');
const mySql = require('../src/config/connection').getInstance();

const newUser = require('./fixtures/dataGenerator');

let testUserId;

describe('Test the users api', () => {
    beforeAll(async () => {
        try {
            const testUsers = newUser.generateMany(10);
            const dbRes = await Promise.all(testUsers.map(user => dbService.create(user)));
            testUserId = dbRes[1].insertId;
        } catch (error) {
            console.log(error);
        }
    });

    afterAll(async () => {
        try {
            await mySql.query('TRUNCATE TABLE users_list;');
        } catch (error) {
            console.log(error);
        }
    });

    test('It should response users_table page', () => {
        return request(app)
            .get('/v1/users')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .then(response => {
                expect(response.statusCode).toBe(200);
            });
    });

    test('It should response users statistic page', () => {
        return request(app)
            .post('/v1/users/statistic')
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .then(response => {
                expect(response.statusCode).toBe(302);
            });
    });

    test('It should create user', () => {
        return request(app)
            .post('/v1/users')
            .send(newUser.generate())
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .then(response => {
                expect(response.statusCode).toBe(302);
            });
    });

    test('It should update user fullName', () => {
        return request(app)
            .post('/v1/users')
            .send(newUser.genUpdUser(testUserId))
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .then(response => {
                expect(response.statusCode).toBe(302);
            });
    });

    test('It should delete user', () => {
        return request(app)
            .post('/v1/users')
            .send({ id: testUserId })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .then(response => {
                expect(response.statusCode).toBe(302);
            });
    });
});
