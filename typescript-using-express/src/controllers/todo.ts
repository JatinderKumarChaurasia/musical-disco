import { RequestHandler } from 'express';
import { Todo } from '../models/Todo';

const TODOS: Todo[] = [];
export const createToDo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newWork = new Todo(Math.random().toString(), text);
    TODOS.push(newWork);
    res.status(200).json({ message: 'Create Todo', createToDo: newWork });
};

export const getTODOS: RequestHandler = (req, res, next) => {
    res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler = (req, res, next) => {
    const id = req.params.id;
    const updatedText = (req.body as { text: string }).text;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex < 0) {
        return new Error('could not able to find what are you looking for');
    }
    TODOS[todoIndex] = new Todo(id, updatedText);
    res.json({ message: 'Updated TODO', updateTodo: TODOS[todoIndex] });
}

export const deleteTODO: RequestHandler = (req, res, next) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === id);
    if (todoIndex < 0) {
        return new Error('could not able to find what are you looking for');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Deleted TODO' });
}