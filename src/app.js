const express = require('express');

const app = express();
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

// const config = require('./config');
require('dotenv').config();

// const link = `mongodb://${config.get('database.DB_HOST')}:${config.get('database.DB_PORT')}/${config.get('database.DB_DATABASE')}`;
// const link = `${config.get('mongoDB.url')}`;

// mongoose
//   .connect(link, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connect successfully');
//     console.log(config.get('localIP'));
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log('Connect failed!');
//   });

app.use(logger('dev'));
// set header
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', require('./routes'));

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // * => allow from any domain
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();

  if (req.method === 'OPTIONS') {
    res.header(
      "Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'GET', 'DELETE",
    );
    return res.status(200).json({});
  }
  next();
});

module.exports = app;
