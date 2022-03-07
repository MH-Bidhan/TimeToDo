const http = require("http");
const app = require("./app");
const { connectToDatabase } = require("./services/mongo.db");

const server = http.createServer(app);
const PORT = process.env.PORT || 9000;

async function startServer() {
  await connectToDatabase();
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

startServer();
