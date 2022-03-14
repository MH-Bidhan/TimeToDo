const express = require("express");
const { checkAuth } = require("../../services/check-auth");
const {
  httpGetAllUser,
  httpCreateNewUser,
  httpUpdateUser,
  httpDeleteUser,
} = require("./users.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetAllUser);
userRouter.post("/", httpCreateNewUser);
userRouter.put("/:id", checkAuth, httpUpdateUser);
userRouter.delete("/:id", checkAuth, httpDeleteUser);

module.exports = userRouter;
