const personDAO = require('../dao/user');

class UserService {
	createUser({username, password}) {

		return personDAO.createUser(username, password);
	}
}

module.exports = new UserService();