const jwt = require("jsonwebtoken");
require("dotenv").config();

async function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    
    if (!token) {
      console.log("Token not found.");
      return res.status(401).send({ msg: "Auth token is missing." });
    }
    const decodedToken = jwt.verify(token, process.env.secret_key);
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).send({ msg: "Invalid token." });
    }
    return res.status(500).send({ msg: "Something went wrong." });
  }
}

module.exports = {
  verifyToken,
};
