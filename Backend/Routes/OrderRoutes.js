import express from "express"
import { Protected } from "../Config/Protect.js"


const orderRoute = express.Router()

import { addOrderItems } from "../Controller/OrderController.js"

orderRoute.route("/").post(Protected, addOrderItems)

export {orderRoute}