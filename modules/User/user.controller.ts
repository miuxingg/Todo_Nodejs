import { Response, Request, NextFunction, json } from "express";
import { IError, IRequest, IUser } from "../../config/interface";
import jwt from "jsonwebtoken";
import { variable } from "../../config/variable.env";
import bcrypt from "bcrypt";
import {
    changePasswordDb,
    changeRoleDb,
    currentUserDb,
    getAllUserDb,
    loginDb,
    registerDb,
    updateProfileDb,
} from "./user.service";
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password, name, address, dateOfBirth } = req.body;
        const user: IUser = { username, password, name, address, dateOfBirth };

        const response: IUser = await registerDb(user);

        const token = jwt.sign({ _id: response._id }, variable.SECRET_KEY);
        res.status(200).json({
            message: "Success",
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password }: IUser = req.body;
        const user = await loginDb({ username });
        if (!user.status) {
            next(user.error);
        } else {
            if (!user.data) {
                const err: IError = {
                    name: "Username error",
                    message: "Username not exist",
                    code: 400,
                };
                next(err);
            } else {
                if (user.data) {
                    if (bcrypt.compareSync(password, user.data?.password)) {
                        const token = jwt.sign(
                            { _id: user.data?._id },
                            variable.SECRET_KEY
                        );
                        res.status(200).json({
                            message: "Success",
                            data: {
                                token,
                            },
                        });
                    } else {
                        const err: IError = {
                            name: "Password error",
                            message: "Password is not correct",
                            code: 400,
                        };
                        next(err);
                    }
                }
            }
        }
    } catch (error) {
        next(error);
    }
};

export const currentUser = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.userId) {
            const user = await currentUserDb(req.userId);
            if (!user) {
                const err: IError = {
                    name: "Error",
                    message: "Not found current user",
                    code: 401,
                };
                next(err);
            } else {
                res.status(200).json({
                    status: "success",
                    data: user,
                    // username: user.username,
                    // name: user.name,
                    // address: user.address,
                    // dateOfBirth: user.dateOfBirth,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.userId) {
            //   const { name, address, dateOfBirth }: IUser = req.body;
            const newUser = await updateProfileDb(req.userId, req.body);
            console.log(newUser);
            res.status(200).json({
                status: "success",
                data: newUser,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const {
        currentPassword,
        newPassword,
    }: { currentPassword: string; newPassword: string } = req.body;
    try {
        if (req.userId) {
            await changePasswordDb(
                req.userId,
                { currentPassword, newPassword },
                res,
                next
            );
        }
    } catch (error) {
        next(error);
    }
};

export const getAllUser = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await getAllUserDb();
        res.status(200).json({
            message: "success",
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const changeRole = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await changeRoleDb(req.params.id);
        if (data) {
            if (data.status) {
                res.status(200).json({
                    status: "success",
                });
            } else {
                next(data.error);
            }
        }
    } catch (error) {
        next(error);
    }
};
