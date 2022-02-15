const db = require('../db/connection');

exports.fetchTopics = () => {
    return db.query('SELECT * FROM topics')
    .then(({rows}) => {
        return rows;
    })
}

exports.fetchArticleById = (id) => {
   return db.query('SELECT * From articles WHERE article_id = $1;', [id])
   .then(({rows}) => {
       if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "Article Not Found"});
       }
       return { article: rows[0] };
       
   })
}