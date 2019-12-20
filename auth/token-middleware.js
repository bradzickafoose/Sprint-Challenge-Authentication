const jsonwebtoken = require('jsonwebtoken');
const secrets = require('./secrets');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d',
    };

    return jsonwebtoken.sign(payload, secrets.jwtSecret, options);
}