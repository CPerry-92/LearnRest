const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");

exports.hashPassword = async (req, res, next) => {
  try {
    const pass = req.body.password;
    const hashedPass = await bcrypt.hash(pass, 8);
    req.body.password = hashedPass;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server error logs" });
  }
};

exports.comparePasswords = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const comparisonBool = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (comparisonBool) {
      req.user = user;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server logs" });
  }
};

exports.tokenAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const noBearerToken = token.replace("Bearer ", "");
    const tokenObj = jwt.verify(noBearerToken, process.env.SECRET);
    const user = await User.findOne({ _id: tokenObj._id });
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Check server logs" });
  }
};
