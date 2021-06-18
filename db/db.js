// import knex library
const knex = require('knex');

// import database configuration file
const knexfile = require('./knexfile.js');

// NOTE in production, don't acces knexfile.development directly
// but decide which env vars which config to use

// grab development object in config file
const db = knex(knexfile.development);

module.exports = db;

