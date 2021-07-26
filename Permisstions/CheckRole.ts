import { NextFunction, Response } from "express";
import { IRequest } from "../config/interface";
import { variable } from "../config/variable.env";
import User from "../models/user.model";
const checkRole = (role: string[]) => {
    return async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            if (req.userId) {
                if (role.length === 1 && role[0] === "*") next();
                else {
                    const roleUser = await User.findOne({
                        _id: req.userId._id,
                    }).select("role");
                    if (roleUser?.role && role.includes(roleUser?.role)) {
                        next();
                    } else {
                        const err = {
                            name: "Role error",
                            message:
                                "You don't have enough permission to perform this action",
                            code: 401,
                        };
                        next(err);
                    }
                }
            }
        } catch (error) {
            next(error);
        }
    };
};

export default checkRole;
