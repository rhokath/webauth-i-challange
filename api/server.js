const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);


const UsersRouter = require('../users/users-router');
const dbConnection = require('../data/db-config');
const server = express();
const sessionConfig = {
    name: 'chocochip',
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
    cookie: {
      maxAge: 1000 * 60 * 60, //in milliseconds
      secure: false, //true means only send cookio over https
      httpOnly: true, // true means JS has no access to the cookie
  
    },
    resave: false,
    saveUninitialized: true, //GGDPr compliance
    store: new KnexSessionStore({
      knex: dbConnection,
      tablename: 'knexsessions',
      sidfieldname: 'sessionid',
      createtable: true,
      clearInterval: 1000 * 60 * 30,
    }),
  }




server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))
server.use('/api/users', UsersRouter);

//sanity get

server.get('/', (req, res)=> {
    res.send('its working');
})

module.exports = server;