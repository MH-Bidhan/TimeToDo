const express = require("express");
const {
  httpGetAllUser,
  httpCreateNewUser,
  httpUpdateUser,
  httpDeleteUser,
} = require("./users.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetAllUser);
userRouter.post("/", httpCreateNewUser);
userRouter.put("/:id", httpUpdateUser);
userRouter.delete("/:id", httpDeleteUser);

module.exports = userRouter;
