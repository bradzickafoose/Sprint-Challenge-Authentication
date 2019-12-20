/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jsonwebtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass!!' });
  }
};
