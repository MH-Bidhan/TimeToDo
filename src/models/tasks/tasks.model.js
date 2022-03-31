const tasks = require("./tasks.mongo");
const users = require("../users/users.mongo");
const { updateUser } = require("../users/users.model");

async function getUserTasks(userId) {
  const allTasks = await tasks.find({ userId });

  return allTasks;
}

async function createNewTask(userId, task) {
  try {
    const newTask = await tasks.create(task);

    const user = await users.findById(userId);
    user.remainingQuota -= 1;
    await updateUser(userId, user);

    return newTask;
  } catch (err) {
    console.log(err.message);
  }
}

async function updateTask(taskId, updatedTaskCred) {
  try {
    const task = await tasks.findByIdAndUpdate(taskId, updatedTaskCred);

    if (task) {
      const updatedTask = tasks.findById(taskId);
      return updatedTask;
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteTask(taskId) {
  try {
    const deletedTask = await tasks.findByIdAndDelete(taskId);
    return deletedTask;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getUserTasks,
  createNewTask,
  updateTask,
  deleteTask,
};
