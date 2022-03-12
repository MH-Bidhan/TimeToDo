const { updateEvent, deleteEvent } = require("../models/events/events.model");

async function checkEventStatus(arrayOfEvents) {
  for (let event of arrayOfEvents) {
    const { archived, timeOfEvent, _id: id } = event;
    const currentTime = Date.now();
    const eventTime = new Date(timeOfEvent).getTime();
    const oneWeek = 604800000;
    const twoWeek = oneWeek * 2;

    // Checks if the event is past it's specified time
    // If it is, upcoming property of that event would be marked as flase
    if (currentTime > eventTime) {
      const updateCred = {
        upcoming: false,
      };

      await updateEvent(id, updateCred);
    }

    // Checks if the time of the event is one week past it's specified time
    // If it is, archived property of that event would be marked as true
    if (currentTime - eventTime >= oneWeek) {
      const updateCred = {
        archived: true,
      };

      await updateEvent(id, updateCred);
    }

    // Checks if the event is archived and time of the event is two week past it's specified time
    // If it is, that event would be deleted

    if (archived && currentTime - eventTime >= twoWeek) {
      await deleteEvent(id);
    }
  }
}

module.exports = {
  checkEventStatus,
};
