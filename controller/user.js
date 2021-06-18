// const db = require("../db/db");

// const userService = require('../service/user');
const userModel = require('../dao/user');

class UserController {
	async createUser(req, res) {
		try {
			// const id = await userService.createUser(req.body);
			const id = await userModel.createUser(req.body);
			res.status(201).json(id);

		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new UserController();