import express from "express";
import checkRole from "../../Permisstions/CheckRole";
import { verifyToken } from "../../middlewares/VerifyToken";
import {
    login,
    register,
    currentUser,
    updateUser,
    changePassword,
    getAllUser,
    changeRole,
} from "./user.controller";
const Router = express.Router();

Router.route("/register").post(register);

Router.route("/login").post(login);

Router.route("/currentuser").get(verifyToken, currentUser);

Router.route("/updateprofile").put(verifyToken, updateUser);

Router.route("/changepassword").put(verifyToken, changePassword);

Router.route("/getalluser").get(verifyToken, checkRole(["admin"]), getAllUser);

Router.route("/changerole/:id").put(
    verifyToken,
    checkRole(["admin"]),
    changeRole
);
export default Router;
