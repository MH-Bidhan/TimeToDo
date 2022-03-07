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
// userRouter.put("/:id", (req, res) => {
//   const { id } = req.params;

//   res.send(id);
// });

module.exports = userRouter;
