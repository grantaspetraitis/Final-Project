const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../db').getPool();

exports.createUser = async (req, res) => {
    const { name, email, username, password} = req.body;
    const date = new Date();
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    pool.query('SELECT email FROM users WHERE email = ? OR username = ?', [email, username], (err, result) => {
        if(err) throw err;
        if(result.length > 0) return res.status(400)

        pool.query('INSERT INTO users SET name = ?, email = ?, username = ?, password = ?, register_date = ?', [name, email, username, hashedPass, date], (err, result) => {
            if (!err) {
                const token = jwt.sign({ user: { id: result.insertId, name, email } }, process.env.JWT_SECRET);
                res.status(200).cookie('AccessToken', token, {
                    maxAge: 3600000,
                    httpOnly: true
                });
            } else {
                console.log(err);
            }
        })
    })
}