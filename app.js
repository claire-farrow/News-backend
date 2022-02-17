const { getTopics } = require("./controllers/topics.controllers");

const {
    getArticles,
  getArticleById,
  getCommentByArticleId,
  patchArticleById,
} = require("./controllers/articles.controllers");

const { getUsers } = require("./controllers/users.controllers");

const {
  pathError,
  handleCustomErrors,
  handlePsqlErrors,
  handle500Errors,
} = require("./controllers/error-controllers");

const express = require("express");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentByArticleId);
app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/users", getUsers);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(pathError);
app.use(handle500Errors);

module.exports = app;
