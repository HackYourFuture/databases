const pool = require('../config');
function login(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    pool.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                if (results[0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
}

module.exports = login;