const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  MONGO_KEY: process.env.MONGO_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
};
