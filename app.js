const express = require("express");
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


const { getTopics } = require("./controllers/topics.controllers");

const {
  getArticles,
  getArticleById,

  patchArticleById,
} = require("./controllers/articles.controllers");

const { getUsers } = require("./controllers/users.controllers");

const {
  pathError,
  handleCustomErrors,
  handlePsqlErrors,
  handle500Errors,
} = require("./controllers/error-controllers");

const {
  getCommentByArticleId,
  postCommentByArticleId,
  deleteCommentById,
} = require("./controllers/comments.controllers");







app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticleById);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id/comments", getCommentByArticleId);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.delete("/api/comments/:comment_id", deleteCommentById);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(pathError);
app.use(handle500Errors);

module.exports = app;
