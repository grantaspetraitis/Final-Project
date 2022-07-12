const jwt = require('jsonwebtoken');


const pool = require('../db').getPool();

exports.getQuestions = async (req, res) => {
    pool.query('SELECT posts.post_title, posts.post_body, users.username, posts.post_id FROM posts JOIN users ON user_id = poster_id', (err, result) => {
        if(err) throw err;
        const ids = result.map(res => res.post_id);
        pool.query('SELECT SUM (rating) AS rating, post_id FROM likes WHERE post_id IN (?) GROUP BY post_id', [ids], (err, result2) => {
            if(err) throw err;
            const posts = result.map(post => {
                const rating = result2.find(res => res.post_id === post.post_id);
                const like_amount = rating ? rating.rating : 0;
                console.log(rating)
                return {...post, like_amount: like_amount}
                
            })
            console.log(posts)
            res.send(posts)
        })
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
    
    pool.query('SELECT posts.post_id, users.username, posts.post_title, posts.post_body FROM posts JOIN users ON user_id = poster_id AND user_id = ?', [ID], (err, result) => {
        if(err) throw err;
        res.status(200).send(result);

    })
}

exports.getQuestion = async (req, res) => {
    const ID = req.params.id;

    pool.query('SELECT * FROM posts WHERE post_id = ?', [ID], (err, result) => {
        if(err) throw err;

        pool.query('SELECT SUM (rating) AS rating FROM likes WHERE post_id = ?', [ID], (err, result2) => {
            if(err) throw err;
            const rating = result2[0].rating;
            const post = {...result[0], like_amount: rating}
            res.status(200).send(post);
        })
    })
}

exports.rating = async (req, res) => {
    const rating = Math.min(Math.max(req.body.rating, -1), 1);
    const post_id = req.body.id;
    let token, decoded;

    try {
        token = req.headers.authorization.split(' ')[1];
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        console.log(err)
        return res.status(401).send({ error: 'You must be logged in to rate' })
    }
    const user_id = decoded.user.user_id;
    pool.query('UPDATE likes SET rating = ? WHERE post_id = ? AND user_id = ?', [rating, post_id, user_id], (err, result) => {
        if(err) throw err;
        if(result.affectedRows < 1){
            pool.query('INSERT INTO likes SET rating = ?, post_id = ?, user_id = ?', [rating, post_id, user_id], (err, result) => {
                if(err) throw err;
            })
        }
    })
    pool.query('SELECT SUM (rating) AS rating FROM likes WHERE post_id = ?', [post_id], (err, result) => {
        if(err) throw err;
        res.send(result[0].rating);
    })
}