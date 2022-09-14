
import asyncHandler from "express-async-handler"
import { Order } from "../Model/OderModel.js"
import { User } from "../Model/UserModel.js"

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("no order item")
    } else {
        const order = await new Order({
        orderItems,
        user : req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
        })
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
})

const getOrder = asyncHandler(async (req, res) => {
    
    try {
        const order = await Order.findById(req.params.id).populate({path:"user",model:User})
        if (order) {
            res.status(200).json(order)
        } else {
            res.status(404)
            throw new Error("not found")
        }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const { paymentResult, email } = req.body
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            order.isPaid = true,
            order.paidAt = Date.now(),
                order.paymentResult = {
                id:paymentResult.trxref,
                status:paymentResult.status,
                // update_time: paymentResult.update_time,
                email_address:email
                }  
            const updatedOrder = await order.save()
            res.status(201).json(updatedOrder)
        } else {
            res.status(404);
            throw new Error("error occurred")
        }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})


export { addOrderItems,getOrder,updateOrderToPaid}