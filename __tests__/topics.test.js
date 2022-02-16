const request = require('supertest');
const app = require('../app');
const data = require('../db/data/test-data');
const db = require('../db/connection');

afterAll(() => db.end());

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
