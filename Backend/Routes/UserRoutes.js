
import express from "express"
import { signInHandler, signUpHandler, updateProfileHandler, fetchProfileHandler,sendPaystack } from "../Controller/UserController.js"
import { Protected } from "../Config/Protect.js";

const userRoute = express.Router()

userRoute.route("/signup").post(signUpHandler);
userRoute.route("/signin").post(signInHandler)

userRoute.route("/updateprofile/:id").post(updateProfileHandler)
userRoute.route("/fetchprofile/:id").get(fetchProfileHandler)
userRoute.route("/paystack").get(Protected,sendPaystack)

export{userRoute}