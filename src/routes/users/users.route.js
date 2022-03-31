const express = require("express");
const {
  checkAuth,
  checkUserSpecificAuth,
} = require("../../services/check-auth");
const {
  httpGetSpecificUser,
  httpCreateNewUser,
  httpUpdateUser,
  httpDeleteUser,
  httpChangePassword,
} = require("./users.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetSpecificUser);
userRouter.post("/", httpCreateNewUser);
userRouter.post(
  "/changePassword/:id",
  checkAuth,
  checkUserSpecificAuth,
  httpChangePassword
);
userRouter.put("/:id", checkAuth, checkUserSpecificAuth, httpUpdateUser);
userRouter.delete("/:id", checkAuth, checkUserSpecificAuth, httpDeleteUser);

module.exports = userRouter;
