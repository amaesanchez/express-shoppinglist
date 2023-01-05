"use strict";

const express = require("express");

const { NotFoundError } = require("./expressError");

const { items } = require("./fakeDb");

const itemsRoutes = require("./items");

const app = express();

app.use(express.json());
app.use("/items", itemsRoutes);

/** matches unmatched routes & raises 404 error */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** returns json of error & logs stack trace */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;