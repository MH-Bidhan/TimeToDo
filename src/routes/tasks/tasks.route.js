const express = require("express");
const {
  checkAuth,
  checkUserSpecificAuth,
} = require("../../services/check-auth");
const {
  httpGetAllTasksOfUser,
  httpCreateNewTask,
  httpUpdateTask,
  httpDeleteTask,
} = require("./tasks.controler");

const taskRouter = express.Router();

taskRouter.get("/", checkAuth, checkUserSpecificAuth, httpGetAllTasksOfUser);
taskRouter.post("/", checkAuth, httpCreateNewTask);
taskRouter.put("/:taskId", checkAuth, checkUserSpecificAuth, httpUpdateTask);
taskRouter.delete("/:taskId", checkAuth, checkUserSpecificAuth, httpDeleteTask);

module.exports = taskRouter;
