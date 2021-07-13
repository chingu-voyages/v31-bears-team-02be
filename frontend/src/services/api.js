const GAMEENDPOINT = 'http://localhost:4001';


const gameAPI = ({ user_id } = '') => ({
		data: {
			user_id,
			path: GAMEENDPOINT,
		},


		async createGame(total_score, artworks) {
			try {
				const { user_id, path } = this.data;

				console.log(user_id);

				const res = await fetch(`${path}/game`, {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({ user_id, total_score, artworks })
				});

				if (!res.ok) {
					const body = await res.json();
					throw new Error(body.error);
				}

				// should receive game_id from backend
				const data = await res.json();
				console.log(data);
				return data;
				
			} catch (error) {
				return error;
			}
		},


		async updateGame() {
			try {
				const { username, password, path } = this.data;
				const res = await fetch(path, {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({ username, password })
				});

				if (!res.ok) {
					const body = await res.json();
					throw new Error(body.error);
				}

				const data = await res.json();
				return data;
			} catch (error) {
				return error;
			}
		},


		async getLeaderboard() {
			try {

				const { path } = this.data;

				const res = await fetch(`${path}/leaderboard`, {
					method: 'GET',
					headers: { 'content-type': 'application/json' },
					// body: JSON.stringify({})
				});

				if (!res.ok) {
					const body = await res.json();
					throw new Error(body.error);
				}

				// should receive leaderboard object from backend
				const data = await res.json();
				console.log(data);
				return data;
				
			} catch (error) {
				return error;
			}
		},
  });

  export default gameAPI;