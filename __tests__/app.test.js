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

describe('/api/articles/', () => {
    describe('GET', () => {
        test('Status: 200 - when passed an article_id responds with a single corresponding article object', () => {
            const id = 2;
            return request(app).get(`/api/articles/${id}`).expect(200).then(({ body: { article }}) => {
                expect(article).toEqual(
                    expect.objectContaining({
                    article_id: id,
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)
                })
                )
            })     
        })
        test('Status: 404 - responds with error msg for VALID but Non-existent article_id', () => {
            return request(app).get('/api/articles/9999999').expect(404).then(({body: {msg}}) => {
                expect(msg).toBe("Article Not Found");
            })
        })
        test('status: 400 - reponse with err msg for invalid article_id', () => {
            return request(app).get("/api/articles/not-an-id").expect(400).then(({ body: { msg } }) => {
                expect(msg).toBe("Bad Request");
            })
        })
    })
})
