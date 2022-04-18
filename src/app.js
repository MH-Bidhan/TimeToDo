const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const morgan = require("morgan");

const authRouter = require("./routes/auth/auth.route");
const userRouter = require("./routes/users/users.route");
const taskRouter = require("./routes/tasks/tasks.route");
const { CORS_ACCESS } = require("./config");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: CORS_ACCESS,
  })
);
app.use(helmet());
// app.use(morgan("combined")); Not activating morgan's loging cause it's a portfolio preject

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/auth/", authRouter);

module.exports = app;
