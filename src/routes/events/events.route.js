const express = require("express");
const {
  httpGetAllEventsOfUser,
  httpCreateNewEvent,
  httpUpdateEvent,
  httpDeleteEvent,
} = require("./event.controler");

const eventRouter = express.Router();

eventRouter.get("/", httpGetAllEventsOfUser);
eventRouter.post("/", httpCreateNewEvent);
eventRouter.put("/:eventId", httpUpdateEvent);
eventRouter.delete("/:eventId", httpDeleteEvent);

module.exports = eventRouter;
