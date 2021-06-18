// Update with your config settings.
// We need this knexfile to run migrations

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'my_db',        
      user:     'postgres',
      password: 'Artguessr2021!'
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
