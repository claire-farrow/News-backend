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

describe('/api/topics', () => {
    describe('GET', () => {
        test('Status: 200 - responds with an array of topic objects containing slug and description properties', () => {
            return request(app).get('/api/topics').expect(200).then(({ body: { topics } }) => {
                expect(topics).toHaveLength(3);
                topics.forEach((topic) => {
                    expect(topic).toEqual(
                        expect.objectContaining({
                            description: expect.any(String),
                            slug: expect.any(String)
                        })
                    )
                })
            })
        })
    })
})
