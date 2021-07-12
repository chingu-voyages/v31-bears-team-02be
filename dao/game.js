

// Game Data Access Object (used to interface w/ db)
class GameDAO {

	gamesTable = 'games';
	userGamesTable = 'user_games';
	usersTable = 'users';

	// /**
	//  * Create new game obj in DB with userId
	//  * @param {knex} db - knex db connection object
	//  * @param {array} artworks - array of integers that refer to artworkIds from MET API
	//  * @returns {Promise<{
	//  * game_id: integer (refers to primary key in game table)
	//  * }>} Promise that resolves to the created game from db
	//  */
	async createGame(db, artworks, total_score) {

		// destructure game after creating new game because knex will return as a 2d array
		const [ game ] = await db(this.gamesTable)	
			.insert({ 																// knex syntax
				total_score,	
				artworks
			})
			// .into(this.gamesTable)									// redundant if passed table name in db('users')
			.returning('*');													// return entire row/object

		return game;													
	}


	// /**
	//  * Create new game obj in DB with userId
	//  * @param {knex} db - knex db connection object
	//  * @param {int} userId - foreign key
	//  * @param {int} gameId - foreign key
	//  * @param {real} updatedStotalScore - new game score (ex. 9/10 = .9)
	//  * @returns {Promise<{
	//  * game_id: integer (refers to primary key in game table)
	//  * }>} Promise that resolves to the updated game from db
	//  */
	async updateGame(db, userId, gameId, updatedStotalScore) {
		
		// TODO: knex syntax for updating db entry
		const [ game ] = await db(this.gamesTable)
			.where({"game_id": gameId})
			.update({
				total_score: updatedStotalScore
			})

		return game;
	}



	async getLeaderboard(db) {
		
		// TODO
		// need knex query to 
		//	- create inner join of user_games and games table on game_id
		//  - collapse table by summing/grouping total_score column on user_id
		//  - sort by total_score descending

		// const leaderBoard =  await db.from(this.userGamesTable)
		// 	.innerJoin(this.gamesTable, `${this.userGamesTable}.game_id`, 
		// 		`${this.gamesTable}.game_id`)
		// 	.sum('total_score')
		// 	.groupBy('user_id')

		// const leaderBoard =  await db.from(this.userGamesTable)
		// 	.innerJoin(this.gamesTable, `${this.userGamesTable}.game_id`, 
		// 		`${this.gamesTable}.game_id`)
		// 	.select('user_id', db.raw('SUM(total_score)'))
		// 	.groupBy('user_id')
			
		const leaderBoard =  await db.select(`${this.usersTable}.user_id`,
				`${this.usersTable}.username`,
				db.raw(`SUM(${this.gamesTable}.total_score)`))
			.from(this.userGamesTable)
			.innerJoin(this.gamesTable, `${this.userGamesTable}.game_id`, 
				`${this.gamesTable}.game_id`)
				.innerJoin(this.usersTable, `${this.userGamesTable}.user_id`, 
					`${this.usersTable}.user_id`)
				.groupBy(`${this.usersTable}.user_id`, `${this.usersTable}.username`)
		
		// Sort objects in array descending
		leaderBoard.sort((a,b) => {
			return (b.sum) - (a.sum);
		});

		// console.log(leaderBoard);
		// leaderBoard == 
		// [
		// 	{ user_id: 1, username: 'joel', sum: 420 },
		// 	{ user_id: 2, username: 'max', sum: 30 }
		// ]

		return leaderBoard;
	}
}


module.exports = new GameDAO();