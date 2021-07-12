import { updateGame } from "../../../dao/game";
const GAMEENDPOINT = 'http://localhost:4001';


const gameAPI = ({ username = '' } = {}) => ({
		data: {
			username,
			path: GAMEENDPOINT,
		},


		async createGame(userName) {
			try {
				const { user_id, path } = this.data;

				const res = await fetch(`${path}/game`, {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({ user_id })
				});

				if (!res.ok) {
					const body = await res.json();
					throw new Error(body.error);
				}

				// should receive game_id from backend
				const data = await res.json();
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
  });

  export default gameAPI;