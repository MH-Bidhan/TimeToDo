const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const PORT = process.env.PORT || 9000;

async function startServer() {
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

startServer();
