"use strict";

const { items } = require("./fakeDb");
const { NotFoundError } = require("./expressError");

function getItem(name) {
  for (let item of items) {
    if (item.name === name) {
      return item;
    }
  }
  throw new NotFoundError();
}

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
