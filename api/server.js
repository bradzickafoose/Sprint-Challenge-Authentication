const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('../auth/router');
const jokesRouter = require('../jokes/router');
const { authenticate } = require('../auth/authenticate');

const server = express()
  .use(helmet())
  .use(cors())
  .use(express.json())
  .use(morgan('dev'))
  .use('/api', authRouter)
  .use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
