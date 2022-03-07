const express = require("express");
const eventRouter = require("./routes/events/events.route");

const userRouter = require("./routes/users/users.route");

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

module.exports = app;
