const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const generateToken = require('./token-middleware');

router.post('/register', (req, res) => {
  const credentials = req.body;

  // hash the password
  const hash = bcrypt.hashSync(credentials.password, 14);

  // override the plain text password with the hash
  credentials.password = hash;

  Users.add(credentials)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        // return 401 if the password or username are invalid
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


module.exports = router;
