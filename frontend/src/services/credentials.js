const USERENDPOINT = 'http://localhost:4001/user';

const credentials = ({ username = '', password = '' } = {}) => ({
  data: {
    username,
    password,
    path: USERENDPOINT,
  },
  async getToken() {
    try {
      const { username, password, path } = this.data;
      const res = await fetch(`${path}/auth`, {
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
  async postNewUser () {
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
})
export default credentials;