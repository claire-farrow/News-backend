const { fetchTopics, fetchArticleById, updateArticleById, fetchUsers } = require('../models/topics.models');

exports.getTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
        res.status(200).send({topics});
    })
    .catch(next);
}

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

exports.getUsers = (req, res, next) => {
    fetchUsers().then((users) => {
        res.status(200).send({users});
    })
    .catch(next);
}