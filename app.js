const { getTopics } = require('./controllers/topics.controllers');
const { serverError, pathError } = require('./controllers/error-controllers');

const express = require('express');

const app = express();

app.get('/api/topics', getTopics);


app.use(pathError);

module.exports = app;