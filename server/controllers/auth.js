const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../db').getPool();

exports.createUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    const date = new Date();
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    pool.query('SELECT email FROM users WHERE email = ? OR username = ?', [email, username], (err, result) => {
        if(err) throw err;
        if(result.length > 0) return res.status(400).send({ success: false })
        // kaip padaryti kad i frontenda nusiustu zinute kad jau yra vartotojas

        pool.query('INSERT INTO users SET name = ?, email = ?, username = ?, password = ?, register_date = ?', [name, email, username, hashedPass, date], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send({ success: true })
            }
        })
    })
}

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) throw err;
        if(result.length > 0) {
            const user = result[0];
            if (err) throw err;

            const hashedPass = user.password;
            const isPasswordCorrect = await bcrypt.compare(password, hashedPass);
            if(!isPasswordCorrect) return res.status(400).send({ success: false });
            // Kaip nusiusti zinute kad passwordas neteisingas

            const token = jwt.sign({ user }, process.env.JWT_SECRET);
            res.status(200).cookie('AccessToken', token, {
                maxAge: 3600000,
                httpOnly: true
            }).send({ success: true });
        } else {
            res.send({ success: false })
            // kaip pasakyti kad nera tokio vartotojo
        }
    })
}