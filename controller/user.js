const xss = require('xss');
const path = require('path');
const UserModel = require('../dao/user');

class UserController {
	async createUser(req, res, next) {
		const { username, password } = req.body;
		const db = req.app.get('db');
		try {
			// Check that username isn't taken
			const userTaken = Boolean(await UserModel.getByUserName(db, username));
			if (userTaken) {
				return res.status(400).json({
					error: 'Username is already taken'
				});
			}
			// Check that password is valid
      const passwordError = UserModel.invalidPassword(password);
      if (passwordError) {
        return res.status(400).json({
          error: passwordError,
        });
      }
			// If checks pass, serialize new user and add to db
			const sanitizedUsername = xss(username);
			const hashedPassword = await UserModel.hashPassword(password);
			const newUser = await UserModel.createUser(db,
				sanitizedUsername,
				hashedPassword,
			);
			// Return created status and new user
			return res.status(201)
				.location(path.posix.join(req.originalUrl, `/${newUser.user_id}`))
				.json({ ...UserModel.serializeUser(newUser) });
		} catch (err) {
			next(err);
		}
	}
	async authenticateUser(req, res, next) {
		// Destructure request
		const { username, password } = req.body;
		// Get db connection
		const db = req.app.get('db');
		// Check that values aren't missing
		if (!(username && password)) {
			return res.status(400).json({
				error: `Missing '${!username ? 'Username' : 'Password'}' on request body.`,
			});
		}

		try {
			// Check if username is in database
			const validUser = await UserModel.getByUserName(db, username);

			if (!validUser) {
        return res.status(401).json({
          error: 'Incorrect username or password',
        });
      }
			// If user found, check for password next
			const validPassword = await UserModel.comparePasswords(password, validUser.password);
			// If password not found return error
			if (!validPassword) {
        return res.status(401).json({
          error: 'Incorrect username or password',
        });
      }

			// If both found, return authorization token
			return res.send({
				authToken: UserModel.createJWT(validUser.username, { userid: validUser.user_id }),
			});
		} catch (error) { next(error) };
	}
}

module.exports = new UserController();