const bcrypt = require("bcryptjs");
const knex = require("knex");
const jwt = require("jsonwebtoken");
const xss = require("xss");
const config = require("../config");

// User data access object (used to abstract interface w/ db)
class UserDAO {
  usersTable = "users";
  secret = config.JWT_SECRET;
  /**
   * Sanitize and parse database values before sending them to client
   * @param {{user_id: number, username: string, date_created: string}} user - User object from database
   * @returns {{user_id: number, username: string, date_created: string}} User object formatted for transfer
   */
  serializeUser = (user) => ({
    user_id: user.user_id,
    username: xss(user.username),
    date_created: user.date_created,
  });
  /**
   * Create new user in DB with given username and password strings
   * @param {knex} db - knex db connection object
   * @param {string} username - Username string
   * @param {string} password - Password string
   * @returns {Promise<{
   * user_id: number, username: string, password: string, date_created: string,
   * }>} Promise that resolves to the created user data form db
   */
  async createUser(db, username, password) {
    // destructure user after creating new user
    const [user] = await db("user")
      .insert({
        // knex syntax:
        username,
        password,
      })
      .into(this.usersTable)
      .returning("*");

    return user;
  }
  /**
   * Look by username in users table and return user object if found
   * @param {knex} db - knex db connection object
   * @param {string} username - Username string to check against db data
   * @returns {Promise<boolean>} Promise resolves to true if given string is taken
   */
  async getByUserName(db, username) {
    const nameInDB = await db(this.usersTable).where({ username }).first();
    return nameInDB;
  }
  
  async getByUserId(db, user_id) {
    const nameInDB = await db(this.usersTable).where({ user_id }).first();
    return nameInDB;
  }
  /**
   * Validates password string to have between 8 and 72 characters
   * @param {string} password
   * @returns A string describing the requirement that didn't pass, or null if no validation problems
   */
  invalidPassword(password) {
    if (password.length < 8) {
      return "Password must be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password be less than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    return null;
  }
  /**
   * Use bcrypt.hash to generate hash from given password string
   * @param {string} password password string provided by user
   * @return {Promise<string>} concatenated salt and hash string generated by bcrypt
   */
  async hashPassword(password) {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }
  /**
   *
   * @param {string} password - The password string given by user
   * @param {string} hash - The hash generated by bcrypt and stored in db
   * @returns Returns promise that resolves to bool wether password is found or not.
   */
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  }
  /**
   * Generate JWT to validate client's requests
   * @param {string} subject - value for sub in JWT
   * @param {object} payload - bearer payload contents
   * @returns JSON Web Token string
   */
  createJWT(subject, payload) {
    return jwt.sign(payload, this.secret, {
      subject,
      algorithm: "HS256",
    });
  }
  /**
   * Verify JWT token sent by client
   * @param {srting} token - JWT token string fom client
   * @returns the decoded token
   */
  verifyJwt(token) {
    return jwt.verify(token, this.secret, {
      algorithms: ["HS256"],
    });
  }
}

module.exports = new UserDAO();
