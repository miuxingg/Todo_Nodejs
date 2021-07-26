import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/ErrorHandle";
import { IError } from "./config/interface";
import { connectDB } from "./config/database";
import Auth from "./modules/User/user.route";
import Task from "./modules/Tasks/task.route";

dotenv.config();
const app = express();
const PORT: number | string = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

/**Connect database */
connectDB();

/** User */
app.use("/api/v1/auth", Auth);

/** Task */
app.use("/api/v1/task", Task);

/** Error handle */
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const error: IError = {
        name: "Error",
        message: "Route not found",
        code: 403,
    };
    next(error);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`App run port ${PORT}`));
