const ls = (key) => ({
  getItem: () => JSON.parse(window.localStorage.getItem(key)),
  setItem: (data) => window.localStorage.setItem(key, JSON.stringify(data)),
  removeItem: () => window.localStorage.removeItem(key),
  decodeUserData: () => {
    const decoded = window.atob(window.localStorage
      .getItem(key)
      .split('.')[1]);
    return JSON.parse(decoded);
  },
});

export default ls;
