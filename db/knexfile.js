// going to read .env file
require('dotenv').config();

// Update with your config settings.
// We need this knexfile to run migrations

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.RDS_DB_NAME,        
      user:     process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      host: process.env.RDS_HOSTNAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
