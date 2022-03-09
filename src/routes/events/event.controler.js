const {
  createNewEvent,
  getUserEvents,
  updateEvent,
  deleteEvent,
} = require("../../models/events/events.model");
const events = require("../../models/events/events.mongo");
const { getUserById } = require("../../models/users/users.model");
const validateEvent = require("./event.validate");

async function httpGetAllEventsOfUser(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      error: {
        message: "No user has been specified",
      },
    });
  }

  const userEvents = await getUserEvents(userId);

  return res.status(200).json(userEvents);
}

async function httpCreateNewEvent(req, res) {
  const { userId } = req.body;
  const timeOfEvent = new Date(req.body.timeOfEvent);
  const currentTime = Date.now();

  if (currentTime > timeOfEvent) {
    return res.status(400).json({
      error: {
        message: "Event time must be in the future",
      },
    });
  }

  const newEvent = {
    ...req.body,
    upcoming: true,
    marked: false,
    completed: true,
    archived: false,
  };

  const user = await getUserById(userId);

  if (!user) {
    return res.status(404).json({
      error: {
        message: "No user found with the given id",
      },
    });
  }

  const { error } = validateEvent(newEvent);

  if (error) {
    return res.status(400).json(error.message);
  }

  const createdEvent = await createNewEvent(newEvent);

  return res.status(201).json(createdEvent);
}

async function httpUpdateEvent(req, res) {
  const updateCred = req.body;
  const { eventId } = req.params;

  const event = await events.findById(eventId);

  const {
    userId,
    name,
    description,
    timeOfEvent,
    upcoming,
    marked,
    completed,
    archived,
  } = event;

  const updatedEventCred = {
    userId,
    name,
    description,
    timeOfEvent,
    upcoming,
    marked,
    completed,
    archived,
    ...updateCred,
  };

  if (!event) {
    return res.status(400).json({
      error: {
        message: "No event found with the given id",
      },
    });
  }

  const { error } = validateEvent(updatedEventCred);

  if (error) {
    return res.status(400).json(error.message);
  }

  const updatedEvent = await updateEvent(eventId, updatedEventCred);

  return res.status(200).json(updatedEvent);
}

async function httpDeleteEvent(req, res) {
  const { eventId } = req.params;

  const event = await events.findById(eventId);

  if (!event) {
    return res.status(400).json({
      error: {
        message: "No event found with the given id",
      },
    });
  }

  const deletedEvent = await deleteEvent(eventId);

  return res.status(200).json(deletedEvent);
}

module.exports = {
  httpGetAllEventsOfUser,
  httpCreateNewEvent,
  httpUpdateEvent,
  httpDeleteEvent,
};
