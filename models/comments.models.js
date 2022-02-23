const db = require("../db/connection");

exports.fetchCommentsByArticleId = (id) => {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1;", [id])
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.createCommentByArticleId = (newComment, id) => {
  const { username, body } = newComment;
  return db
    .query(
      "INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;",
      [username, body, id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }
      return rows[0];
    });
};

exports.removeCommentById = (id) => {
  return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [
    id,
  ]);
};
