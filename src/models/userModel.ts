import mongoose from "mongoose";
import { UserType } from "../utils/types";

const userModel = new mongoose.Schema<UserType>({

    firstName: { type: String, require: true },
    lastName: { type: String, require: true, },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },

}, { timestamps: true })

export const UserModel = mongoose.model("User", userModel)