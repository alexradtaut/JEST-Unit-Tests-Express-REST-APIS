const e = require('express');
const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const endpointUrl = '/todos/';

let firstTodo, newTodoId;
const testData = { title: 'Update item', done: true };
const nonExistingId = '60058308cd3b340e48be1111';

describe(endpointUrl, () => {
  test('GET ' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });

  test('GET by id ' + endpointUrl + ':todoId', async () => {
    const response = await request(app).get(endpointUrl + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });

  test('GET by id doesn`t exist' + endpointUrl + ':todoId', async () => {
    const response = await request(app).get(endpointUrl + nonExistingId);
    expect(response.statusCode).toBe(404);
  });

  it('POST ' + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id;
  });

  it(
    'should return error 500 on malformed data within URL ' + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: 'Missing Done Property' });
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({
        message: 'Todo validation failed: done: Path `done` is required.',
      });
    }
  );

  it('PUT ' + endpointUrl + newTodoId, async () => {
    const res = await request(app)
      .put(endpointUrl + newTodoId)
      .send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });

  it('should return 404 on PUT ' + endpointUrl, async () => {
    const res = await request(app)
      .put(endpointUrl + nonExistingId)
      .send();
    expect(res.statusCode).toBe(404);
  });

  it('DELETE ' + endpointUrl + newTodoId, async () => {
    const res = await request(app)
      .delete(endpointUrl + newTodoId)
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });

  it('should return 404 on DELETE ' + endpointUrl, async () => {
    const res = await request(app)
      .delete(endpointUrl + nonExistingId)
      .send();
    expect(res.statusCode).toBe(404);
  });
});
