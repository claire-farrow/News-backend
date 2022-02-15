const { getTopics, getArticleById } = require('./controllers/topics.controllers');
const { pathError, handleCustomErrors, handlePsqlErrors } = require('./controllers/error-controllers');

const express = require('express');

const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(pathError);

module.exports = app;