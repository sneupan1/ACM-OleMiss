const jwt = require("jsonwebtoken");
const User = require("../models/user");

const officerAuth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, "THIS_IS_TOP_SECRET");
    const user = await User.findOne({
      _id: decoded,
      "tokens.token": token,
    });
    if (!user || (user.role !== "admin" && user.role !== "officer")) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send([{ message: "Not Authorized!" }]);
  }
};

module.exports = officerAuth;
