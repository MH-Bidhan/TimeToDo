const express = require("express");
const { httpGetAllEvents, httpCreateNewEvent } = require("./event.controler");

const eventRouter = express.Router();

eventRouter.get("/", httpGetAllEvents);
eventRouter.post("/", httpCreateNewEvent);

module.exports = eventRouter;
