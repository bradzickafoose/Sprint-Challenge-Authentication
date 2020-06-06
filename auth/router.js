const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const { generateToken } = require('./authenticate');

router
  .post('/register', register)
  .post('/login', login);

function register(req, res, next) {
  const user = req.body;

  if (user.username && user.password) {
    // hash the password
    user.password = bcrypt.hashSync(user.password, 14);

    Users
      .add(user)
      .then(user => res.status(201).json(user))
      .catch(next);

  } else {
    res.status(400).json({
      message: 'Requires username and password',
    });
  }
}

function login(req, res, next) {
  let { username, password } = req.body;

  Users
    .findBy({ username })
    .first()
    .then(user => {
      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        // return 401 if the password or username are invalid
        res.status(401).json({
          message: 'Invalid credentials',
        });
      }
    })
    .catch(next);
}

module.exports = router;
