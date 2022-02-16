const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');
const db = require('../db/connection');

beforeEach(() => seed(data));

afterAll(() => db.end());

describe('app', () => {
    test('Status: 404 - responds with error msg when path not found', () => {
        return request(app).get('/notpath').expect(404).then(({ body: {msg} }) => {
            expect(msg).toBe("Path Not Found");
        })
    })
})

