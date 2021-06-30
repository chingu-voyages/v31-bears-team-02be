const knex = require('knex');
const config = require("../config");


// User Game- Data Access Object (used to interface w/ db)
class UserGameDAO {

	// ? has to match migration table name?
	userGamesTable = 'user_games';
	
	// /**
	//  * Create new user_game obj in DB with userId
	//  * @param {knex} db - knex db connection object
	//  * @param {int} user_id - id of user (sent from front end, refers to primary key in user table)
	//  * @param {int} game_id - passed from game controller
	//  * @returns {Promise<{
	//  * user_game_id: integer (refers to primary key in user_game table)
	//  * }>} Promise that resolves to the created user_game from db
	//  */
	async createUserGame(db, user_id, game_id) {

		// destructure user_game after creating new user_game obj
		const [ user_game ] = await db(this.userGamesTable)									
			.insert({ 		// knex syntax:
				user_id,
				game_id,
			})
			// .into(this.userGamesTable)														// redundant if passed table name in db('user_games')
			.returning('*');
		
		return user_game;

	}
}


module.exports = new UserGameDAO();
