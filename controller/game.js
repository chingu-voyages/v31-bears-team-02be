const gameModel = require('../dao/game');
const userGameModel = require('../dao/userGame');


class GameController {
	// also implicitly passed in next (callback), and err
	// next is a middleware function
	async createGame(req, res, next) {			
		try {
			
			// deconstruct / get userId out of request
			const { userId, artworks } = req.body					// artworks == [ ints ]

			// what is app? / what is db? 
			// app == .get method is part of express/built in
			// db == value of key 'db' (see server.js in app.set method). db = obj that represents the database
			const db = req.app.get('db');

			// create new game obj in db
			const game = await gameModel.createGame(db, artworks);

			// create new user_game obj in db. Why do model methods have to take in db?
			const userGame = await userGameModel.createUserGame(db, userId, game.game_id);

			// send gameId back to front end
			res.status(201).json(game.game_id);						// ? correct key?

		} catch (err) {
			console.log(err);
		}
	}


	async updateGame(req, res) {
		try {

			const { userId, gameId, updated_total_score } = req.body;

			const db = req.app.get('db');

			const game = await gameModel.updateGame(db, userId, gameId, updated_total_score);

			res.status(201).json(game);

		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new GameController();