const express = require("express");
const {
  checkAuth,
  checkUserSpecificAuth,
} = require("../../services/check-auth");
const {
  httpGetAllUser,
  httpCreateNewUser,
  httpUpdateUser,
  httpDeleteUser,
  httpChangePassword,
} = require("./users.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetAllUser);
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
