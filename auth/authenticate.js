const jwt = require('jsonwebtoken');
const jwtSecret =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable.';

module.exports = {
  authenticate,
  generateToken,
};

function generateToken(user) {
  user.password = undefined;
  const payload = user;
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, jwtSecret, options);
}

function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) return res.status(401).json(error);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}
