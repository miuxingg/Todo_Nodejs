import express, { NextFunction, Response, Request } from "express";
import { IError } from "../config/interface";
const errorHandler = (
    err: IError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.code = err.code || 500;

    if (err.code === 11000) {
        err.code = 400;
        for (let p in err.keyValue) {
            err.message = `${p} have to be unique`;
        }
    }

    if (err.kind === "ObjectId") {
        err.code = 403;
        err.message = `${err.value} not exist`;
    }

    if (err.errors) {
        err.code = 403;
        err.message = "";
        for (let p in err.errors) {
            if (p) {
                err.message += err.errors[p].properties!.message! + ". ";
            }
        }
        console.log(err.errors);
    }

    res.status(err.code).json({
        status: "fail",
        message: err.message,
    });
};

export default errorHandler;
