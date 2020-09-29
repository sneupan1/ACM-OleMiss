const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded, "tokens.token": token });
    if (!user) {
      throw new Error("Invalid Token, User not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send([{ message: "Please Login First" }]);
  }
};

module.exports = auth;
