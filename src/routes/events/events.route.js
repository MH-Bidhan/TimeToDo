const express = require("express");
const {
  checkAuth,
  checkUserSpecificAuth,
} = require("../../services/check-auth");
const {
  httpGetAllEventsOfUser,
  httpCreateNewEvent,
  httpUpdateEvent,
  httpDeleteEvent,
} = require("./event.controler");

const eventRouter = express.Router();

eventRouter.get("/", checkAuth, checkUserSpecificAuth, httpGetAllEventsOfUser);
eventRouter.post("/", checkAuth, httpCreateNewEvent);
eventRouter.put("/:eventId", checkAuth, checkUserSpecificAuth, httpUpdateEvent);
eventRouter.delete(
  "/:eventId",
  checkAuth,
  checkUserSpecificAuth,
  httpDeleteEvent
);

module.exports = eventRouter;
