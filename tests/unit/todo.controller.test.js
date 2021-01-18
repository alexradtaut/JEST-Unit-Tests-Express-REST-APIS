const ToDoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

// TodoModel.create = jest.fn();
// TodoModel.find = jest.fn();
// TodoModel.findById = jest.fn();
// TodoModel.findByIdAndUpdate = jest.fn();
// TodoModel.findByIdAndDelete = jest.fn();

jest.mock('../../model/todo.model');

let req, res, next;
const todoId = '60058b76a500a63b08ae5731';
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('ToDoController.deleteTodo', () => {
  beforeEach(() => {
    req.params.todoId = todoId;
  });

  it('should have a deleteTodo function', () => {
    expect(typeof ToDoController.deleteTodo).toBe('function');
  });

  it('should call TodoModel.findByIdAndDelete with route parameters', async () => {
    await ToDoController.deleteTodo(req, res, next);
    expect(TodoModel.findByIdAndDelete).toBeCalledWith(todoId);
  });

  it('should return response with status 200 and in JSON format', async () => {
    TodoModel.findByIdAndDelete.mockReturnValue(newTodo);
    await ToDoController.deleteTodo(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled()).toBeTruthy();
  });

  // it('should handle errors', async () => {
  //   const errorMessage = { message: 'Error' };
  //   const rejectedPromise = Promise.reject(errorMessage);
  //   TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
  //   await TodoController.deleteTodo(req, res, next);
  //   expect(next).toHaveBeenCalledWith(errorMessage);
  // });

  it('should return 404 when item doesn`t exist', async () => {
    TodoModel.findByIdAndDelete.mockReturnValue(null);
    await ToDoController.deleteTodo(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('ToDoController.updateTodo', () => {
  beforeEach(() => {
    req.params.todoId = todoId;
    req.body = newTodo;
  });

  it('should have a updateTodo function', () => {
    expect(typeof ToDoController.updateTodo).toBe('function');
  });

  it('should call TodoModel.findByIdAndUpdate with route parameters', async () => {
    await ToDoController.updateTodo(req, res, next);
    expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
      new: true,
      useFindAndModify: false,
    });
  });

  it('should return response with status 200 and in JSON format', async () => {
    TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
    await ToDoController.updateTodo(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  // it('should handle errors', async () => {
  //   const errorMessage = { message: 'Error' };
  //   const rejectedPromise = Promise.reject(errorMessage);
  //   TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
  //   await TodoController.updateTodo(req, res, next);
  //   expect(next).toHaveBeenCalledWith(errorMessage);
  // });

  it('should return 404 when item doesn`t exist', async () => {
    TodoModel.findByIdAndUpdate.mockReturnValue(null);
    await ToDoController.updateTodo(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('ToDoController.getTodoById', () => {
  it('should have a getTodoById function', () => {
    expect(typeof ToDoController.getTodoById).toBe('function');
  });

  it('should call TodoModel.findById with route parameters', async () => {
    req.params.todoId = '60058b76a500a63b08ae5731';
    await ToDoController.getTodoById(req, res, next);
    expect(TodoModel.findById).toBeCalledWith('60058b76a500a63b08ae5731');
  });

  it('should return response with status 200 and in JSON format', async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    req.params.todoId = '60058b76a500a63b08ae5731';
    await ToDoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Server Error' };
    const rejectedPromiste = Promise.reject(errorMessage);
    TodoModel.findById.mockReturnValue(rejectedPromiste);
    await ToDoController.getTodoById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it('should return 404 when item doesn`t exist', async () => {
    TodoModel.findById.mockReturnValue(null);
    await ToDoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('ToDoController.getTodos', () => {
  it('should have a getTodos function', () => {
    expect(typeof ToDoController.getTodos).toBe('function');
  });

  it('should call TodoModel.find', async () => {
    await ToDoController.getTodos(req, res, next);
    expect(TodoModel.find).toHaveBeenCalledWith({});
  });

  it('should return response with status 200 and all todos', async () => {
    TodoModel.find.mockReturnValue(allTodos);
    await ToDoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Server Error' };
    const rejectedPromiste = Promise.reject(errorMessage);
    TodoModel.find.mockReturnValue(rejectedPromiste);
    await ToDoController.getTodos(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('TodoController.createTodo', () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  it('should have a createTodo function', () => {
    expect(typeof ToDoController.createTodo).toBe('function');
  });

  it('should call TodoModel.create', () => {
    ToDoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it('should return 201 response code', async () => {
    await ToDoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await ToDoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Property missing' };
    const rejectedPromiste = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromiste);
    await ToDoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
