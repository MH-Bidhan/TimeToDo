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
  httpGetTaskById,
} = require("./tasks.controler");

const taskRouter = express.Router();

taskRouter.get("/", checkAuth, checkUserSpecificAuth, httpGetAllTasksOfUser);
taskRouter.get("/:id", checkAuth, httpGetTaskById);
taskRouter.post("/", checkAuth, httpCreateNewTask);
taskRouter.put("/:taskId", checkAuth, checkUserSpecificAuth, httpUpdateTask);
taskRouter.delete("/:taskId", checkAuth, checkUserSpecificAuth, httpDeleteTask);

module.exports = taskRouter;
