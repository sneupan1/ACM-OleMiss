const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, "THIS_IS_TOP_SECRET");
    const user = await User.findOne({
      _id: decoded,
      "tokens.token": token,
      role: "admin",
    });
    if (!user) {
      throw new Error("Invalid token, admin not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send([{ message: "Admin authorization required" }]);
  }
};

module.exports = adminAuth;
