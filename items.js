"use strict";

const express = require("express");

const { NotFoundError, BadRequestError } = require("./expressError");

const router = express.Router();

const {items} = require("./fakeDb")

const { getItem, updateItem, deleteItem } = require("./utils")

/** returns list of shopping items */
router.get("/", function(req, res) {
  return res.json({ items })
})

/** accepts JSON and adds item to items and returns item */
router.post("/", function(req, res) {
  if (req.body === undefined) throw new BadRequestError();

  const item = req.body
  items.push(item)

  return res.json({ added: item })
})

/** return single item */
router.get("/:name", function(req, res) {
  return res.json(getItem(req.params.name))
})

/** accepts JSON, modifies item, and returns item */
router.patch("/:name", function(req, res) {
  if (req.body === undefined) throw new BadRequestError();

  return res.json({ updated: updateItem(req.params.name, req.body)})

})

/** deletes item for items array */
router.delete("/:name", function(req, res) {

  return res.json({ message: deleteItem(req.params.name)})
})


module.exports = router
