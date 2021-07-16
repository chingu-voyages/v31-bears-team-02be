const GAMEENDPOINT = "/api/game";

const gameAPI = ({ user_id } = "") => ({
  data: {
    user_id,
    path: GAMEENDPOINT,
  },

  async createGame(total_score, artworks, token) {
    try {
      const { user_id, path } = this.data;

      console.log(user_id);

      const res = await fetch(`${path}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, total_score, artworks }),
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

  async updateGame(token) {
    try {
      const { username, password, path } = this.data;
      const res = await fetch(path, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
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
