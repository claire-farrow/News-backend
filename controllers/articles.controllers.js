const { fetchArticleById, updateArticleById } = require('../models/articles.models');

exports.getArticleById = (req, res, next) => {
    const id = req.params.article_id;
    fetchArticleById(id)
    .then((article) => {
        res.status(200).send({article});
    })
    .catch(next);
}

exports.patchArticleById = (req, res, next) => {
    const body = req.body;
    const {article_id} = req.params;
    updateArticleById(article_id, body)
    .then((article) => {
        res.status(200).send({article});
    })
    .catch(next);
}
