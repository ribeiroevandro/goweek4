const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

require('dotenv').config();

const port = process.env.PORT || 4000;

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds153593.mlab.com:53593/goweek4-backend`,
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, () => {
  console.log("Server Started on port:", port);
});
