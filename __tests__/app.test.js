const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("app", () => {
  test("Status: 404 - responds with error msg when path not found", () => {
    return request(app)
      .get("/notpath")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path Not Found");
      });
  });
});

describe("/api/topics", () => {
  describe("GET", () => {
    test("Status: 200 - responds with an array of topic objects containing slug and description properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).toHaveLength(3);
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              })
            );
          });
        });
    });
  });
});

describe("/api/articles/", () => {
  describe("GET", () => {
    test("Status: 200 - when passed an article_id responds with a single corresponding article object", () => {
      const id = 2;
      return request(app)
        .get(`/api/articles/${id}`)
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: id,
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String)
            })
          );
        });
    });

    test("Status: 200 - responds with array of article ojects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });

    test("Status 200: Articles are sorted-by date in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toBeSortedBy("created_at", {
            descending: true,
          });

        
          test('Status 200: Articles are sorted-by date in descending order', () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
                expect(articles).toBeSortedBy("created_at", {
                    descending: true
                })
            })
          })
      
          test('Status: 200 - Returns an array of comments for the given article_id', () => {
            const id = 3
            return request(app).get(`/api/articles/${id}/comments`).expect(200).then(({ body: { comments } }) => {
              expect(comments).toEqual(expect.objectContaining({
                article_id: id,
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String)
              }))
            })
          })
        });
    });

    test("Status: 404 - responds with error msg for VALID but Non-existent article_id", () => {
      return request(app)
        .get("/api/articles/9999999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Article Not Found");
        });
    });
    test("status: 400 - reponse with err msg for invalid article_id", () => {
      return request(app)
        .get("/api/articles/not-an-id")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });
  });

  describe("PATCH", () => {
    test("Status: 200 - accept an object of inc_votes which increments vote by a positive number", () => {
      const positiveVote = { inc_votes: 1 };
      return request(app)
        .patch(`/api/articles/2`)
        .send(positiveVote)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual(
            expect.objectContaining({
              article_id: 2,
              title: expect.any(String),
              topic: "mitch",
              author: "icellusedkars",
              body: expect.any(String),
              created_at: expect.any(String),
              votes: 1,
            })
          );
        });
    });
    test("Status: 200 - accept an object of inc_votes which decrements vote by a negative number", () => {
      const negativeVote = { inc_votes: -100 };
      return request(app)
        .patch(`/api/articles/4`)
        .send(negativeVote)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual(
            expect.objectContaining({
              article_id: 4,
              title: expect.any(String),
              topic: "mitch",
              author: "rogersop",
              body: expect.any(String),
              created_at: expect.any(String),
              votes: -100,
            })
          );
        });
    });
    test("status: 400 - reponse with err msg for invalid inc_vote request", () => {
      const invalidVote = { inc_votes: NaN };
      return request(app)
        .patch("/api/articles/3")
        .send(invalidVote)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });
    test("status: 400 - reponse with err msg inc_vote spelt wrong but with VALID number", () => {
      const invalidVote = { inc_voes: 3 };
      return request(app)
        .patch("/api/articles/3")
        .send(invalidVote)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });
    test("status: 400 - reponse with err msg when extra key is added to the inc_vote request", () => {
      const invalidVote = { inc_votes: 3, title: "invalid" };
      return request(app)
        .patch("/api/articles/3")
        .send(invalidVote)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    test("Status: 200 - responds with an array of objects with the property username", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).toHaveLength(4);
          users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
              })
            );
          });
        });
    });
  });
});

