import { Router } from 'express';
import { createToDo, getTODOS, updateTodo, deleteTODO } from '../controllers/todo';

const router = Router();
router.get('/', getTODOS);
router.post('/', createToDo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTODO);

export default router;