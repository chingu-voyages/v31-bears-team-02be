"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _knex = _interopRequireDefault(require("knex"));

var _user = _interopRequireDefault(require("./routes/user"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// server.js
//
// Load enviroment variables using a .env file
require('dotenv').config(); // Utility modules


var NODE_ENV = _config["default"].NODE_ENV,
    PORT = _config["default"].PORT,
    RDS_HOSTNAME = _config["default"].RDS_HOSTNAME,
    RDS_USERNAME = _config["default"].RDS_USERNAME,
    RDS_PASSWORD = _config["default"].RDS_PASSWORD,
    RDS_PORT = _config["default"].RDS_PORT,
    RDS_DB_NAME = _config["default"].RDS_DB_NAME; //const router = require('./routes');
// Moved port variable initialization to config file
// const PORT = process.env.HTTP_PORT || 4001;
// const PORT = process.env.PORT || 4001;
// Create express object with name app

var app = (0, _express["default"])();
/* Establish connection to database and save as property of 
express app with name 'db'. To access the database use 
'app.get('db')' or if inside 'app.use()' with 'req.app.get('db')' */

exports.app = app;
app.set('db', (0, _knex["default"])({
  client: 'pg',
  connection: {
    database: RDS_DB_NAME,
    user: RDS_USERNAME,
    password: RDS_PASSWORD,
    port: RDS_PORT,
    host: RDS_HOSTNAME
  }
})); // Setup logger with formats for each enviroment ('common' for production and 'dev' for development)

app.use((0, _morgan["default"])(NODE_ENV === 'production' ? 'common' : 'dev', {
  // Skip logging when run in test enviroment
  skip: function skip() {
    return NODE_ENV === 'test';
  }
}));

if (NODE_ENV === 'production') {
  // Append logging to file
  app.use((0, _morgan["default"])('common', {
    // create a write stream in append mode and log to file 'express-access.log'
    stream: _fs["default"].createWriteStream(_path["default"].join(__dirname, '..', '..', 'log', 'express-access.log'), {
      flags: 'a'
    })
  }));
} else {
  // Append logging to file
  app.use((0, _morgan["default"])('common', {
    // create a write stream in append mode and log to file 'access.log'
    // pwd in production is /var/app/current, set log file address to '../../log/' so access.log is saved in /var/log/
    stream: _fs["default"].createWriteStream(_path["default"].join(__dirname, 'access.log'), {
      flags: 'a'
    })
  }));
} // Handle cors


app.use((0, _cors["default"])()); // Serve static files located in frontend/build

app.use(_express["default"]["static"](_path["default"].join(__dirname, 'frontend', 'build'))); // Testing routes

app.get('/', function (req, res) {
  res.send('just gonna send it');
});
app.get('/flower', function (req, res) {
  res.json({
    name: 'Dandelion',
    colour: 'Blue-ish',
    env: process.env,
    // for testing
    port: PORT // for testing

  });
}); // API routes

app.use('/user', _user["default"]); // Error handling

app.use(function (error, req, res, next) {
  var response;

  if (NODE_ENV === 'production') {
    response = {
      error: error.message
    };
  } else {
    console.error(error);
    response = {
      error: error.message
    };
  }

  res.status(500).json(response);
});
app.listen(PORT, function () {
  console.log("Server listening at port ".concat(PORT, "."));
}); // express.json() is a built-in middleware, parses incoming JSON requests, returns Object
// app.use(express.json());
// app.use(router);
