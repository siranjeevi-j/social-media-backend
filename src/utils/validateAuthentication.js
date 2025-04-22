const jwt = require("jsonwebtoken");
const User = require("../models/users");

const validateAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ message: "Authentication Error" });
    }

    const decodedObj = await jwt.verify(token, "secret-key");
    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (user) {
      req.user = user;

      next();
    } else {
      throw new Error("Authentication Error");
    }
  } catch {
    res.status(401).send({ message: "Authentication Error" });
  }
};

module.exports = validateAuthentication;
