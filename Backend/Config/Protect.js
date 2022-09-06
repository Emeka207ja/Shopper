import jwt from "jsonwebtoken"
import { User } from "../Model/UserModel.js"
import asyncHandler from "express-async-handler"

export const Protected = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next()
        } catch (error) {
            res.status(400)
            throw new Error("Unathorised")
        }
    }
    if (!token) {
         res.status(400)
            throw new Error("Unathorised")
    }
})