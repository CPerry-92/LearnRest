const { Router } = require("express");
const {
  addUser,
  logIn,
  updateEmail,
  deleteUser,
  listUser,
} = require("./user.controllers");
const {
  hashPassword,
  comparePasswords,
  tokenAuth,
} = require("../middleware/index");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.post("/login", comparePasswords, logIn);
userRouter.get("/token", tokenAuth, logIn);
userRouter.put("/update", updateEmail);
userRouter.delete("/delete", deleteUser);
userRouter.get("/list", listUser);

module.exports = userRouter;
