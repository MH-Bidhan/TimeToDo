const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth/auth.route");
const userRouter = require("./routes/users/users.route");
const taskRouter = require("./routes/tasks/tasks.route");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/auth/", authRouter);

module.exports = app;
