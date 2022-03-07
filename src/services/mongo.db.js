const mongoose = require("mongoose");
const { MONGO_KEY } = require("../config");

mongoose.connection
  .on("open", () => console.log("Connected with database"))
  .on("error", (error) => console.log(error.message));

async function connectToDatabase() {
  return await mongoose.connect(MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function disconnectFromDatabase() {
  return await mongoose.disconnect();
}

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
};
