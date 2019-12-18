"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = require("../models/Todo");
const TODOS = [];
exports.createToDo = (req, res, next) => {
    const text = req.body.text;
    const newWork = new Todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newWork);
    res.status(200).json({ message: 'Create Todo', createToDo: newWork });
};
exports.getTODOS = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.updateTodo = (req, res, next) => {
    const id = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex < 0) {
        return new Error('could not able to find what are you looking for');
    }
    TODOS[todoIndex] = new Todo_1.Todo(id, updatedText);
    res.json({ message: 'Updated TODO', updateTodo: TODOS[todoIndex] });
};
exports.deleteTODO = (req, res, next) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === id);
    if (todoIndex < 0) {
        return new Error('could not able to find what are you looking for');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Deleted TODO' });
};
