import "dotenv/config";

import createBareServer from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "http";

const bare = createBareServer("/bare/");
const app = express();

app.use(express.static("public"));

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.listen({ port });
