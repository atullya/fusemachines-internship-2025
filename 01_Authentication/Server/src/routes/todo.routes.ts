import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/errorHandler';
import { createTodo, deleteTodo, editTodo, getTodo } from '../controllers/todoController';

const todoRoutes=express.Router();

todoRoutes.post('/create',authMiddleware,asyncHandler(createTodo));

todoRoutes.put('/edit/:id', authMiddleware, asyncHandler(editTodo));

// Edit specific subTodo inside a todo
todoRoutes.put('/edit/:id/subtodos/:subTodoId', authMiddleware, asyncHandler(editTodo));
todoRoutes.delete('/delete/:id', authMiddleware, asyncHandler(deleteTodo));
todoRoutes.delete('/delete/:id/subtodos/:subTodoId', authMiddleware, asyncHandler(deleteTodo));

todoRoutes.get('/read', authMiddleware, asyncHandler(getTodo));
export default todoRoutes