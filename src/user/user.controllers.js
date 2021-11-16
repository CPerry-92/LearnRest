const User = require("./user.model");

exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({ message: "Success!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong, check server logs" });
  }
};
