const {
  fetchArticles,
  fetchArticleById,

  updateArticleById,
} = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;

  fetchArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  fetchArticleById(id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const body = req.body;
  const { article_id } = req.params;
  updateArticleById(article_id, body)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
