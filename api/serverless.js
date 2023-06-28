"use strict";

import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(import("../src/routes.ts"));

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}