const events = require("./events.mongo");

async function getUserEvents(user) {
  const allEvents = await events.find(user);

  return allEvents;
}

async function createNewEvent(event) {
  try {
    const newEvent = await events.create(event);
    return newEvent;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getUserEvents,
  createNewEvent,
};
