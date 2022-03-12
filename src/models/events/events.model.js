const events = require("./events.mongo");
const users = require("../users/users.mongo");
const { updateUser } = require("../users/users.model");

async function getUserEvents(userId) {
  const allEvents = await events.find({ userId });

  return allEvents;
}

async function createNewEvent(userId, event) {
  try {
    const newEvent = await events.create(event);

    const user = await users.findById(userId);
    user.remainingQuota -= 1;
    await updateUser(userId, user);

    return newEvent;
  } catch (err) {
    console.log(err.message);
  }
}

async function updateEvent(eventId, updatedEventCred) {
  try {
    const event = await events.findByIdAndUpdate(eventId, updatedEventCred);

    if (event) {
      const updatedEvent = events.findById(eventId);
      return updatedEvent;
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteEvent(eventId) {
  try {
    const deletedEvent = await events.findByIdAndDelete(eventId);
    return deletedEvent;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getUserEvents,
  createNewEvent,
  updateEvent,
  deleteEvent,
};
