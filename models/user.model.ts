import mongoose, { Model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../config/interface";
const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "username must be require"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password must be require"],
            minlength: [6, "Password must be at 6 characters"],
            trim: true,
        },
        name: {
            type: String,
            required: [true, "Name must be require"],
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            default: new Date(),
        },
        address: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
    },
    { timestamps: true }
);

UserSchema.pre<IUser>("save", function (next) {
    try {
        const user = this;
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (!err) {
                user.password = hash;
                next();
            } else {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
});

const User = mongoose.model<IUser>("users", UserSchema);
export default User;
