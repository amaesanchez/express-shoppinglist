'use strict';

const request = require('supertest');

const app = require('./app');
let db = require('./fakeDb');

let testItem = {name: 'starfruit', price: 1000};

beforeEach(function() {
  db.items.push(testItem);
});

afterEach(function() {
  db.items.length = 0;
});

/** GET /items should return '{items: [item, ...]}' */
describe('GET /items', function() {
  it('Gets a list of items', async function() {
    const resp = await request(app).get('/items');

    expect(resp.body).toEqual(
      {'items': [{
          name: 'starfruit',
          price: 1000
        }]
      }
    );
    expect(resp.statusCode).toEqual(200);
  });
});

/** POST /items should create an item from request body and return
 * '{added: item}'
 */
describe('POST /items', function() {
  it('Creates an item', async function() {
    const resp = await request(app)
      .post('/items')
      .send({name: 'Posted Item', price: 1000000});

      expect(resp.body).toEqual(
        {added: {
            name: 'Posted Item',
            price: 1000000
          }
        }
      );
      expect(resp.statusCode).toEqual(200);
  });

  it('Gives a 400 if no body is sent', async function() {
    const resp = await request(app)
      .post('/items');
    expect(resp.statusCode).toEqual(400);
  });
});

/** GET /items/[name] should return 'item' */
describe('GET /items/:name', function() {
  it('Gets one item', async function() {
    const resp = await request(app).get(`/items/${testItem.name}`);

    expect(resp.body).toEqual(
      {
        name: 'starfruit',
        price: 1000
      }
    );
    expect(resp.statusCode).toEqual(200);
  });

  it('Gives a 404 if name does not exist', async function() {
    const resp = await request(app).get('/items/fake');
    expect(resp.statusCode).toEqual(404);
  });
});

/** PATCH /items/[name] update an item, return '{updated: item}' */
describe('PATCH /items/:name', function() {
  it('Updates an item', async function() {
    const resp = await request(app)
      .patch(`/items/${testItem.name}`)
      .send({name: 'Suzie'});

      expect(resp.body).toEqual({
        updated: {
            name: 'Suzie',
            price: 1000
          }
        }
      );
      expect(resp.statusCode).toEqual(200);
  });

  it('Gives a 400 if no body is sent', async function() {
    const resp = await request(app)
      .patch(`/items/${testItem.name}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/** DELETE /items/[name] delete an item, return '{message: Deleted}' */
describe('DELETE /items/:name', function() {
  it('Deletes an item', async function() {
    const resp = await request(app).delete(`/items/${testItem.name}`);

    expect(resp.body).toEqual({message: 'Deleted'});
    expect(resp.statusCode).toEqual(200);
  });

  it('Gives a 404 if name does not exist', async function() {
    const resp = await request(app).delete('/items/fake');
    expect(resp.statusCode).toEqual(404);
  });
});