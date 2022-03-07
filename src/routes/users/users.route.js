const express = require("express");
const { httpGetAllUser, httpCreateNewUser } = require("./users.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetAllUser);
userRouter.post("/", httpCreateNewUser);

module.exports = userRouter;
