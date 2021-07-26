import { Document } from "mongoose";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IUser {
    _id?: string;
    username: string;
    password: string;
    name?: string;
    dateOfBirth?: Date;
    address?: string;
    role?: string;
}

export interface ITask {
    _id?: string;
    author: string;
    title: string;
    desc: string;
    complete: string;
    isImportant: boolean;
}

export interface IError extends Error {
    code?: number;
    keyValue?: { username: string };
    kind?: string;
    value?: string;
    // errors?: {
    //     properties?: { message?: string; path?: string; type?: string };
    // };
    errors?: any;
}

export interface IRequest extends Request {
    userId?: JwtPayload;
}
