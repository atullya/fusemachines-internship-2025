import { logger } from "../config/logger";
import Todo from "../models/todo.model";
import User from "../models/user.model";
import express, { Request, Response } from "express";

export const createTodo = async (req: Request, res: Response) => {
  logger.info("Creating Todo....");
  const userId = req.user._id;
  const { title, description, subTodos } = req.body;
  if (!title || !description || !userId) {
    return res.status(400).json({
      message: "title, description, and userId are required",
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const newTodo = await Todo.create({
    title,
    description,
    user: userId,
    subTodos: subTodos || [],
  });
  res.status(201).json({
    success: true,
    message: "Todo created successfully",
    newTodo,
  });
};

export const editTodo = async (req: Request, res: Response) => {
  logger.info("Editing Todo...");
  const userId = req.user._id;
  const { id, subTodoId } = req.params; // grab both Todo and optional subTodo id
  const { title, description, isCompleted } = req.body;


  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let updatedTodo;

  if (subTodoId) {
   
    updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, "subTodos._id": subTodoId }, // match parent and sub
      {
        $set: {
//             $set means: “Assign this field a new value.”
// Without $set, if you just dropped in { title, description }, you’d overwrite the entire document — not what we want.
          "subTodos.$.title": title,
          "subTodos.$.description": description,
          "subTodos.$.isCompleted": isCompleted,
        },
      },
      { new: true }
    );
  } else {

    updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, isCompleted, user: userId },
      { new: true }
    );
  }

  if (!updatedTodo) {
    return res.status(404).json({
      success: false,
      message: subTodoId
        ? "SubTodo not found"
        : "No Todo exists with that id",
    });
  }

  return res.status(200).json({
    success: true,
    message: subTodoId
      ? "Successfully updated SubTodo"
      : "Successfully updated Todo",
    newEditedTodo: updatedTodo,
  });
};
export const deleteTodo = async (req: Request, res: Response) => {
  logger.info("Deleting Todo...");
  const userId = req.user._id;   
  const { id, subTodoId } = req.params;

  let result;


    if (subTodoId) {
     
      result = await Todo.findOneAndUpdate(
        { _id: id, user: userId },             
        { $pull: { subTodos: { _id: subTodoId } } },
        { new: true }
      );

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Todo or SubTodo not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Successfully deleted SubTodo",
        updatedTodo: result,
      });
    } else {
 
      result = await Todo.findOneAndDelete({ _id: id, user: userId });

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Successfully deleted Todo",
        deletedTodo: result,
      });
    }
 
};

export const getTodo=async(req:Request,res:Response)=>{
    logger.info("Getting Todo...");
     const userId = req.user._id;
     
     const getAllTodo=await Todo.find({user:userId})
         if (!getAllTodo || getAllTodo.length === 0) {
      return res.status(404).json({ success: false, message: "No todos found for this user!" });
    }

    return res.status(200).json({
      success: true,
      count: getAllTodo.length,
      todos: getAllTodo,
    });
}