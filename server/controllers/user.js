const pool = require('../db').getPool();

exports.getQuestions = async (req, res) => {
    pool.query('SELECT * FROM posts', (err, result) => {
        if(!err) return res.send(result);
    })
}