const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrpt = require('bcryptjs');

const UsersRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/users', UsersRouter);

//sanity get

server.get('/', (req, res)=> {
    res.send('its working');
})

module.exports = server;