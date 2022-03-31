const {
  createNewTask,
  getUserTasks,
  updateTask,
  deleteTask,
} = require("../../models/tasks/tasks.model");
const tasks = require("../../models/tasks/tasks.mongo");
const { getUserById } = require("../../models/users/users.model");
const errorMessage = require("../../services/error-messages");
const { checkTaskStatus } = require("../../services/task-status");
const { verifyAuthToken } = require("../../services/jwt");
const validateTask = require("./tasks.validate");

async function httpGetAllTasksOfUser(req, res) {
  // Sends a get request to the Server to get all tasks created by a specific user
  const token = req.header("x-auth-token");

  const { id: userId } = verifyAuthToken(token);

  if (!userId) {
    return res.status(400).json(errorMessage.noUserSpecified);
  }

  const userTasksForCheck = await getUserTasks(userId);

  await checkTaskStatus(userTasksForCheck);

  const userTasks = await getUserTasks(userId);

  return res.status(200).json(userTasks);
}

async function httpCreateNewTask(req, res) {
  const token = req.header("x-auth-token");
  const { id: userId } = verifyAuthToken(token);
  const timeOfTask = new Date(req.body.timeOfTask);
  const currentTime = Date.now();

  if (currentTime > timeOfTask) {
    return res.status(400).json(errorMessage.taskTimeError);
  }

  const newTask = {
    ...req.body,
    userId,
    upcoming: true,
    marked: false,
    completed: true,
    archived: false,
    isImportant: false,
  };

  const user = await getUserById(userId);

  if (!user) {
    return res.status(404).json(errorMessage.userNotFound);
  }

  if (user.remainingQuota === 0) {
    return res.status(400).json(errorMessage.missingQuota);
  }

  const { error } = validateTask(newTask);

  if (error) {
    return res.status(400).json(error.message);
  }

  const createdTask = await createNewTask(userId, newTask);

  return res.status(201).json(createdTask);
}

async function httpUpdateTask(req, res) {
  const token = req.header("x-auth-token");
  const { id } = verifyAuthToken(token);

  const updateCred = req.body;
  const { taskId } = req.params;

  const task = await tasks.findById(taskId);

  if (!task) {
    return res.status(404).json(errorMessage.userNotFound);
  }

  const {
    userId,
    name,
    description,
    timeOfTask,
    upcoming,
    marked,
    completed,
    archived,
    isImportant,
  } = task;

  if (userId !== id) {
    return res.status(404).json(errorMessage.accessDenied);
  }

  const updatedTaskCred = {
    userId,
    name,
    description,
    timeOfTask,
    upcoming,
    marked,
    completed,
    archived,
    isImportant,
    ...updateCred,
  };

  const { error } = validateTask(updatedTaskCred);

  if (error) {
    return res.status(400).json(error.message);
  }

  const updatedTask = await updateTask(taskId, updatedTaskCred);

  return res.status(200).json(updatedTask);
}

async function httpDeleteTask(req, res) {
  const token = req.header("x-auth-token");
  const { id } = verifyAuthToken(token);

  const { taskId } = req.params;

  const task = await tasks.findById(taskId);

  if (!task) {
    return res.status(400).json(errorMessage.userNotFound);
  }
  const { userId } = task;

  if (userId !== id) {
    return res.status(404).json(errorMessage.accessDenied);
  }

  const deletedTask = await deleteTask(taskId);

  return res.status(200).json(deletedTask);
}

module.exports = {
  httpGetAllTasksOfUser,
  httpCreateNewTask,
  httpUpdateTask,
  httpDeleteTask,
};
