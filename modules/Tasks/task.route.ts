import express from "express";
import { verifyToken } from "../../middlewares/VerifyToken";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "./task.controller";

const Router = express.Router();

Router.route("/").get(verifyToken, getTasks).post(verifyToken, createTask);

Router.route("/:id")
    .put(verifyToken, updateTask)
    .delete(verifyToken, deleteTask);

export default Router;
