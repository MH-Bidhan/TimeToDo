const express = require("express");
const { checkAuth } = require("../../services/check-auth");
const {
  httpGetAllEventsOfUser,
  httpCreateNewEvent,
  httpUpdateEvent,
  httpDeleteEvent,
} = require("./event.controler");

const eventRouter = express.Router();

eventRouter.get("/", checkAuth, httpGetAllEventsOfUser);
eventRouter.post("/", checkAuth, httpCreateNewEvent);
eventRouter.put("/:eventId", checkAuth, httpUpdateEvent);
eventRouter.delete("/:eventId", checkAuth, httpDeleteEvent);

module.exports = eventRouter;
