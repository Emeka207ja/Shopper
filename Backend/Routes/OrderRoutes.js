import express from "express"
import { Protected } from "../Config/Protect.js"


const orderRoute = express.Router()

import { addOrderItems,getOrder,updateOrderToPaid } from "../Controller/OrderController.js"

orderRoute.route("/").post(Protected, addOrderItems)
orderRoute.route("/:id").get(Protected, getOrder)
orderRoute.route("/:id").put(Protected, updateOrderToPaid)


export {orderRoute}