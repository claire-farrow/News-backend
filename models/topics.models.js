const db = require('../db/connection');

exports.fetchTopics = () => {
    return db.query('SELECT * FROM topics')
    .then(({rows}) => {
        return rows;
    })
}

exports.fetchArticleById = (id) => {
   return db.query('SELECT * FROM articles WHERE article_id = $1;', [id])
   .then(({rows}) => {
       if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "Article Not Found"});
       }
       return rows[0];
   })
}

exports.updateArticleById = (article_id, newVote) => {
    const {inc_votes} = newVote
    return db.query('UPDATE articles SET votes=votes+$1 WHERE article_id=$2 RETURNING *;', [inc_votes, article_id]) 
    .then(({rows}) => {
        return rows[0];
    })
}