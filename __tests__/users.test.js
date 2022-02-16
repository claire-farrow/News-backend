const request = require('supertest');
const app = require('../app');
const data = require('../db/data/test-data');
const db = require('../db/connection');

afterAll(() => db.end());

describe('/api/users', () => {
    describe('GET', () => {
        test('Status: 200 - responds with an array of objects with the property username', () => {
            return request(app).get('/api/users').expect(200)
            .then(({ body: { users } }) => {
                expect(users).toHaveLength(4);
                users.forEach((user) => {
                    expect(user).toEqual(expect.objectContaining({
                        username: expect.any(String)
                    }))
                })
            })
        })
    })
})