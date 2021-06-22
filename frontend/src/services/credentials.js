const LOGINPATH = 'http://localhost:4001/user/auth';

const credentials = ({ username = '', password = '' } = {}) => ({
  data: {
    username,
    password,
    path: LOGINPATH,
  },
  async getToken () {
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
      console.error(error);
    }
  }
})
export default credentials;