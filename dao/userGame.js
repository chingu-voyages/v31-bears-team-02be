import knex from 'knex';
import config from '../config';


// User Game- Data Access Object (used to interface w/ db)
class UserGameDAO {

	// ? has to match migration table name?
	userGamesTable = 'user_games';
	
	// /**
	//  * Create new user_game obj in DB with userId
	//  * @param {knex} db - knex db connection object
	//  * @param {int} userId - id of user (sent from front end, refers to primary key in user table)
	//  * @param {int} gameId - passed from game controller
	//  * @returns {Promise<{
	//  * user_game_id: integer (refers to primary key in user_game table)
	//  * }>} Promise that resolves to the created user_game from db
	//  */
	async createUserGame(db, userId, gameId) {

		// destructure user_game after creating new user_game obj
		const [ user_game ] = await db('user_game')									// ? singular even though table name is plural?
			.insert({ 		// knex syntax:
				userId,
				gameId,
			})
			.into(this.userGamesTable)
			.returning('*');
		
		return user_game;

	}
}


export default new UserGameDAO();