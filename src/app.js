const express = require("express");

const eventRouter = require("./routes/events/events.route");
const authRouter = require("./routes/auth/auth.route");
const userRouter = require("./routes/users/users.route");

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/auth/", authRouter);

module.exports = app;
