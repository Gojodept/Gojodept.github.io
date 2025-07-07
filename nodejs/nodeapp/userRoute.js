import mongoose from "mongoose";
import express from "express"
import bcrypt from "bcrypt";
import { authenticate,authorize } from "./auth.js";
import jwt from "jsonwebtoken";
const SECRET = "something";
const Router = express.Router();
import userModel from "./userModel.js";
import { register,login,updateUser,deleteUser,profile } from "./userController.js";

Router.post("/register",register);

Router.post("/login",login);

Router.get("/showusers", authenticate, authorize("admin"), );

Router.patch("/:id", authenticate, authorize("admin"),);

Router.delete("/:id", authenticate, authorize("admin"),);

Router.get("/:id/profile", authenticate, );

export default Router