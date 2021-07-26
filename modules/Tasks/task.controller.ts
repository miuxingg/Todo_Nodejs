import { Request, Response, NextFunction } from "express";
import { IRequest, ITask } from "../../config/interface";
import {
    createTaskDb,
    deleteTaskDb,
    getTasksDb,
    updateTaskDb,
} from "./task.service";

export const createTask = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.userId) {
            const data = await createTaskDb({
                ...req.body,
                author: req.userId._id,
            });
            if (!data?.status) {
                next(data.error);
            } else {
                res.status(200).json({
                    message: "Success",
                    data: data?.data,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.userId) {
            const data = await getTasksDb(req.userId._id);
            if (data.status) {
                if (data.data) {
                    res.status(200).json({
                        message: "Success",
                        data: data.data,
                    });
                }
            } else {
                next(data.error);
            }
        }
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.userId) {
            const idTask = req.params.id;
            const data = await updateTaskDb(idTask, { ...req.body });
            if (data.status) {
                res.status(200).json({
                    message: "Success",
                    data: data.data,
                });
            } else {
                next(data.error);
            }
        }
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.userId) {
            const idTask = req.params.id;
            const data = await deleteTaskDb(idTask, next);
            if (!data.status) {
                next(data.error);
            } else {
                res.status(200).json({
                    message: "Success",
                    data: data.data,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};
