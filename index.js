import express from "express";
import { createServer } from "http";
import Server from "tomp-bare-server/Server.mjs";

const bare = new Server("/bare/");
const app = express();

app.use(express.static("public/"));

const server = createServer();

server.on("request", (req, res) => {
  if (bare.route_request(req, res)) return;
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (bare.route_upgrade(req, socket, head)) return;
  socket.end();
});

server.listen(process.env.PORT || 80);
