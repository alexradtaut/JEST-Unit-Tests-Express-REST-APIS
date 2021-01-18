const express = require('express');
const router = express.Router();
const toDoController = require('../controllers/todo.controller');

router.post('/', toDoController.createTodo);
router.get('/', toDoController.getTodos);
router.get('/:todoId', toDoController.getTodoById);
router.put('/:todoId', toDoController.updateTodo);
router.delete('/:todoId', toDoController.deleteTodo);

module.exports = router;
