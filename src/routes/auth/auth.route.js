const express = require("express");
const { loginUser } = require("./auth.controler");

const authRouter = express.Router();

authRouter.post("/login", loginUser);

module.exports = authRouter;
