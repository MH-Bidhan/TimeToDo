const {
  createNewEvent,
  getUserEvents,
} = require("../../models/events/events.model");
const { getUserById } = require("../../models/users/users.model");
const validateEvent = require("./event.validate");

async function httpGetAllEvents(req, res) {
  const user = req.query;

  const userEvents = await getUserEvents(user);
  console.log(user);

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

module.exports = {
  httpGetAllEvents,
  httpCreateNewEvent,
};
