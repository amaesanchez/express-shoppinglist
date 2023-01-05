"use strict";
// Would call this sort of thing models
// DOCSTRINGS!!!!!!!!

const { items } = require("./fakeDb");
const { NotFoundError } = require("./expressError");

// Find method would be useful
function getItem(name) {
  for (let item of items) {
    if (item.name === name) {
      return item;
    }
  }
  throw new NotFoundError();
}

// Could use an internal helper with _ (don't forget to put messages in errors)
function updateItem(name, body) {
  for (let item of items) {
    if (item.name === name) {
      item.name = body.name || item.name;
      item.price = body.price || item.price;
      return item;
    }
  }
  throw new NotFoundError();
}

// Find method or filter would be useful
function deleteItem(name) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === name) {
      items.splice(i, 1);
      return "Deleted";
    }
  }
  throw new NotFoundError();
}

module.exports = {
  getItem,
  updateItem,
  deleteItem
};
