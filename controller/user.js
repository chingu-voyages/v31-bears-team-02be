import xss from 'xss';
import path from 'path';
import UserModel from '../dao/user';

class UserController {
	async createUser(req, res, next) {
		const { username, password } = req.body;
		const db = req.app.get('db');
		try {
			// Check that username isn't taken
			const userTaken = await UserModel.usernameTaken(db, username);
			if (userTaken) {
				return res.status(400).json({
					error: 'Username is already taken'
				});
			}
			// TODO: Check that password is valid

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
}

export default new UserController();