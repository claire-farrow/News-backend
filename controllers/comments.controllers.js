const { removeCommentById } = require("../models/comments.models");

exports.deleteCommentById = (req, res, next) => {
    const id = req.params.comment_id;
    removeCommentById(id)
    .then(() => {
        res.status(204).end();
    })
    .catch(next);
}