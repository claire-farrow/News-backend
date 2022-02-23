const {
  fetchCommentsByArticleId,
  createCommentByArticleId,
  removeCommentById,
} = require("../models/comments.models");

exports.getCommentByArticleId = (req, res, next) => {
  const id = req.params.article_id;
  fetchCommentsByArticleId(id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const newComment = req.body;
  const id = req.params.article_id;
  createCommentByArticleId(newComment, id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const id = req.params.comment_id;
  removeCommentById(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
};
