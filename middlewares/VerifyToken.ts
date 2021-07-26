import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { IError, IRequest } from "../config/interface";
import { variable } from "../config/variable.env";
export const verifyToken = (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const Authorization = req.header("authorization");
    if (!Authorization) {
        const error: IError = {
            name: "token",
            message: "Unauthorization",
            code: 401,
        };
        next(error);
    } else {
        const token = Authorization.replace("Bearer ", "");
        jwt.verify(token, variable.SECRET_KEY, function (err, decode) {
            if (!err) {
                if (decode) {
                    req.userId = decode;
                    next();
                } else {
                    const error: IError = {
                        name: "token",
                        message: "token empty",
                        code: 401,
                    };
                    next(error);
                }
            } else {
                const error: IError = {
                    name: "token",
                    message: "Secret key worng",
                    code: 401,
                };
                next(error);
            }
        });
    }
};
