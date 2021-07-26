import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../config/interface";
import User from "../../models/user.model";
import { NextFunction, Response } from "express";
import bcrypt from "bcrypt";
export const registerDb = async (props: IUser) => {
    const { username, password, name, address, dateOfBirth } = props;
    return await User.create({
        username,
        password,
        name,
        address,
        dateOfBirth,
    });
};

export const loginDb = async (props: { username: string }) => {
    try {
        const { username } = props;
        const data = await User.findOne({ username });
        return { status: true, data };
    } catch (error) {
        return { status: false, error };
    }
};

export const currentUserDb = async (userId: JwtPayload) => {
    return await User.findOne({ _id: userId._id }).select(
        "username name address dateOfBirth role"
    );
};

export const updateProfileDb = async (userId: JwtPayload, props: IUser) => {
    return await User.findByIdAndUpdate({ _id: userId._id }, props, {
        new: true,
        runValidators: true,
    });
};

export const changePasswordDb = async (
    userId: JwtPayload,
    prop: { currentPassword: string; newPassword: string },
    res: Response,
    next: NextFunction
) => {
    try {
        const userPassword = await User.findOne({ _id: userId._id }).select(
            "password"
        );
        if (userPassword) {
            if (
                bcrypt.compareSync(prop.currentPassword, userPassword.password)
            ) {
                bcrypt.hash(prop.newPassword, 10, async function (err, hash) {
                    if (!err) {
                        const user = await User.findByIdAndUpdate(
                            { _id: userId._id },
                            { password: hash }
                        );
                        res.status(200).json({
                            status: "success",
                        });
                    } else {
                        next(err);
                    }
                });
            } else {
                const err = {
                    name: "Current password worng",
                    message: "Current password worng",
                    code: 401,
                };
                next(err);
            }
        }
    } catch (error) {
        next(error);
    }
};

export const getAllUserDb = async () => {
    return await User.find({}).select("-password");
};

export const changeRoleDb = async (userId: string) => {
    try {
        const role = await User.findById(userId).select("role");
        if (role) {
            const data = await User.findByIdAndUpdate(
                userId,
                {
                    role: role.role === "admin" ? "user" : "admin",
                },
                { new: true }
            );
            return { status: true, data };
        }
    } catch (error) {
        return { status: false, error };
    }
};
