import mongoose, { Schema } from "mongoose";
import { ITask } from "../config/interface";

const TaskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: [true, "Title must be required"],
            trim: true,
        },
        desc: {
            type: String,
            required: [true, "Description must be required"],
            trim: true,
        },
        isImportant: {
            type: Boolean,
            default: false,
        },
        complete: {
            type: Boolean,
            default: false,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { timestamps: true }
);

export default mongoose.model<ITask>("tasks", TaskSchema);
