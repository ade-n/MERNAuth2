const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from heather link :https://stackoverflow.com/questions/39017297/what-is-difference-between-x-auth-token-vs-authorisation-headers-which-is-prefer
  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "no token authorization" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //check to see if it matches with the req.user matches with the payload
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
