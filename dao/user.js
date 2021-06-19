// data access object (used to abstract interface w/ db?)

const db = require('../db/db');

class UserDAO {
	async createUser(username, password) {

		// destructure id after creating new user
		const [id] = await db('user').insert({ // knex syntax:
			username,
			password
		})
		.returning('id');

		return id;
	}
}

module.exports = new UserDAO();