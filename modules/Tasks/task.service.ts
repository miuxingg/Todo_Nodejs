import { NextFunction } from "express";
import { ITask } from "../../config/interface";
import Task from "../../models/tasks.model";

export const createTaskDb = async (task: ITask) => {
    try {
        const data = await Task.create(task);
        return { status: true, data };
    } catch (error) {
        return { status: false, error };
    }
};

export const getTasksDb = async (author: string) => {
    try {
        const data = await Task.find({ author: author });
        return { status: true, data };
    } catch (error) {
        return { status: false, error };
    }
};

export const updateTaskDb = async (_id: string, task: ITask) => {
    try {
        const data = await Task.findByIdAndUpdate(_id, task, {
            new: true,
            runValidators: true,
        });
        return { status: true, data };
    } catch (error) {
        return { status: false, error };
    }
};

export const deleteTaskDb = async (_id: string, next: NextFunction) => {
    try {
        const data = await Task.findByIdAndDelete(_id);
        return { status: true, data };
    } catch (error) {
        return { status: false, error };
    }
};
