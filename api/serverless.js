"use strict";

import Fastify from "fastify";

import { appRoutes } from "./routes";

const app = Fastify({
  logger: true,
});

app.register(appRoutes);

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}