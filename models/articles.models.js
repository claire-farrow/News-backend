const db = require("../db/connection");

exports.fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortBy = ["created_at", "title", "topic", "author", "votes"];
  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  let queryArticle = `SELECT * FROM articles `;

  const queryValues = [];
  if (topic) {
    queryArticle += `WHERE topic = $1 `;
    queryValues.push(topic);
  }

  queryArticle += `ORDER BY ${sort_by} ${order};`;
  
  return db.query(queryArticle, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Topic Not Found" });
    }
    return rows;
  });
};

exports.fetchArticleById = (id) => {
  return db
    .query(
      `SELECT articles.*, 
      COUNT(comments.comment_id) 
      AS comment_count 
      FROM articles 
      LEFT JOIN comments 
      ON articles.article_id = comments.article_id WHERE articles.article_id = $1 
      GROUP BY articles.article_id;`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
      return rows[0];
    });
};

exports.updateArticleById = (article_id, newVote) => {
  const { inc_votes } = newVote;
  const newVoteKeys = Object.keys(newVote).pop("inc_votes");
  if (!newVoteKeys.includes("inc_votes") && newVoteKeys.length > 0) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      "UPDATE articles SET votes=votes+$1 WHERE article_id=$2 RETURNING *;",
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
      return rows[0];
    });
};
