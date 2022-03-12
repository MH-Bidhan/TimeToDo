const {
  createNewEvent,
  getUserEvents,
  updateEvent,
  deleteEvent,
} = require("../../models/events/events.model");
const events = require("../../models/events/events.mongo");
const { getUserById } = require("../../models/users/users.model");
const errorMessage = require("../../services/error-messages");
const { checkEventStatus } = require("../../services/event-status");
const validateEvent = require("./event.validate");

async function httpGetAllEventsOfUser(req, res) {
  // Sends a get request to the Server to get all events created by a specific user
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json(errorMessage.noUserSpecified);
  }

  const userEventsForCheck = await getUserEvents(userId);

  await checkEventStatus(userEventsForCheck);

  const userEvents = await getUserEvents(userId);

  return res.status(200).json(userEvents);
}

async function httpCreateNewEvent(req, res) {
  const { userId } = req.body;
  const timeOfEvent = new Date(req.body.timeOfEvent);
  const currentTime = Date.now();

  if (currentTime > timeOfEvent) {
    return res.status(400).json(errorMessage.eventTimeError);
  }

  const newEvent = {
    ...req.body,
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

  const { error } = validateEvent(newEvent);

  if (error) {
    return res.status(400).json(error.message);
  }

  const createdEvent = await createNewEvent(userId, newEvent);

  return res.status(201).json(createdEvent);
}

async function httpUpdateEvent(req, res) {
  const updateCred = req.body;
  const { eventId } = req.params;

  const event = await events.findById(eventId);

  if (!event) {
    return res.status(404).json(errorMessage.userNotFound);
  }

  const {
    userId,
    name,
    description,
    timeOfEvent,
    upcoming,
    marked,
    completed,
    archived,
    isImportant,
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
    isImportant,
    ...updateCred,
  };

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
    return res.status(400).json(errorMessage.userNotFound);
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
