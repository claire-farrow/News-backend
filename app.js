const { getTopics, getArticleById, patchArticleById } = require('./controllers/topics.controllers');

const { pathError, handleCustomErrors, handlePsqlErrors, handle500Errors } = require('./controllers/error-controllers');

const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchArticleById);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(pathError);
app.use(handle500Errors);

module.exports = app;