const {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  updateArticleById
} = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  fetchArticles()
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

exports.getCommentByArticleId = (req, res, next) => {
  const id = req.params.article_id;
  fetchCommentsByArticleId(id)
  .then((comments) => {
    res.status(200).send({comments});
  })
  .catch(next);
}

exports.patchArticleById = (req, res, next) => {
  const body = req.body;
  const { article_id } = req.params;
  updateArticleById(article_id, body)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
