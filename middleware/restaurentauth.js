const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      msg: "No token",
    });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.restaurent = decoded.restaurent;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is wrong", isExp: true });
  }
};
