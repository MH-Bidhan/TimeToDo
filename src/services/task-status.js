const { updateTask, deleteTask } = require("../models/tasks/tasks.model");

async function checkTaskStatus(arrayOfTasks) {
  for (let task of arrayOfTasks) {
    const { archived, timeOfTask, _id: id } = task;
    const currentTime = Date.now();
    const taskTime = new Date(timeOfTask).getTime();
    const oneWeek = 604800000;
    const twoWeek = oneWeek * 2;

    // Checks if the task is past it's specified time
    // If it is, upcoming property of that task would be marked as flase
    if (currentTime > taskTime) {
      const updateCred = {
        upcoming: false,
      };

      await updateTask(id, updateCred);
    }

    // Checks if the time of the task is one week past it's specified time
    // If it is, archived property of that task would be marked as true
    if (currentTime - taskTime >= oneWeek) {
      const updateCred = {
        archived: true,
      };

      await updateTask(id, updateCred);
    }

    // Checks if the task is archived and time of the task is two week past it's specified time
    // If it is, that task would be deleted

    if (archived && currentTime - taskTime >= twoWeek) {
      await deleteTask(id);
    }
  }
}

module.exports = {
  checkTaskStatus,
};
