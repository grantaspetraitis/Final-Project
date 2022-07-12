const jwt = require('jsonwebtoken');


const pool = require('../db').getPool();

exports.getQuestions = async (req, res) => {
    pool.query('SELECT posts.post_title, posts.post_body, posts.like_amount, users.username, posts.post_id FROM posts JOIN users ON user_id = poster_id', (err, result) => {
        if(!err) return res.send(result);
    })
}

exports.addQuestion = async (req, res) => {

    let token, decoded;

    try {
        token = req.headers.authorization.split(' ')[1];
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        console.log(err)
        return res.status(401).send({ error: 'You must be logged in to post a question' })

    }
    const ID = decoded.user.user_id;
    const createDate = new Date();
    const { title, body } = req.body;
    pool.query('INSERT INTO posts SET poster_id = ?, post_title = ?, post_body = ?, post_date = ?', [ID, title, body, createDate], (err, result) => {
        if(err) throw err;
        res.status(200).send({ id: result.insertId });
    })
}

exports.editQuestion = async (req, res) => {

}

exports.getProfile = async (req, res) => {
    let token, decoded;

    try{
        token = req.headers.authorization.split(' ')[1];
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        console.log(err)
        return res.status(401).send({ error: 'You must be logged in to view your profile' })
    }
    const ID = decoded.user.user_id;
    
    pool.query('SELECT posts.post_id, users.username, posts.post_title, posts.post_body, posts.like_amount FROM posts JOIN users ON user_id = poster_id AND user_id = ?', [ID], (err, result) => {
        if(err) throw err;
        console.log(result)
        res.status(200).send(result);

    })
}

exports.getQuestion = async (req, res) => {
    const ID = req.params.id;

    pool.query('SELECT * FROM posts WHERE post_id = ?', [ID], (err, result) => {
        if(err) throw err;
        res.status(200).send(result[0]);
    })
}