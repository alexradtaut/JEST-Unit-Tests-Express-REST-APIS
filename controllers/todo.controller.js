const e = require('express');
const TodoModel = require('../model/todo.model');

exports.createTodo = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const getAll = await TodoModel.find({});
    res.status(200).json(getAll);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const getTodo = await TodoModel.findById(req.params.todoId);
    if (getTodo) {
      res.status(200).json(getTodo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.todoId,
      req.body,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const deletedToDo = await TodoModel.findByIdAndDelete(req.params.todoId);
    if (deletedToDo) {
      res.status(200).json(deletedToDo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};
