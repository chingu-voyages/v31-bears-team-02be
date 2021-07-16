const UserModel = require("../dao/user");

const requireAuth = (req, res, next) => {
  const authToken = req.get("Authorization") || "";

  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  }
  const bearerToken = authToken.slice(7, authToken.length);

  try {
    const payload = UserModel.verifyJwt(bearerToken);

    UserModel.getByUserId(req.app.get("db"), payload.user_id)
      .then((user) => {
        if (!user)
          return res.status(401).json({ error: "Unauthorized request" });
        console.log(payload);

        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized request" });
  }
};

module.exports = requireAuth;
