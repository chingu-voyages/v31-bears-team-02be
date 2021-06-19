// up = new changes you want to do
exports.up = function(knex) {

	// create new table called 'user'
	return knex.schema.createTable('user', table => {

		// table has a column called 'id' and autoincrements
		table.increments('id');

		// add column called 'username', that must not be null and all usernames are unique
		table.string('username').notNullable().unique();

		// password_digest = hashed password stored in db (dont store actual pw)
		table.string('password_digest').notNullable();

		// add timestamp of when row/user is created/updated
		table.timestamps(true, true);
	});
};


// down = rollback/undo migration changes
exports.down = function(knex) {
  return knex.schema.dropTable('person');
};

// in terminal run:
// 	npx knex migrate:latest --knexfile db/knexfile.js
// that will take a look at the migrations, and run them