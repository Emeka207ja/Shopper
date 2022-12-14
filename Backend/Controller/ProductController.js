import asyncHandler from "express-async-handler"
import { Product } from "../Model/ProductModel.js"

const fetchProductsHandler = asyncHandler(async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const fetchSingleProductHandler = asyncHandler(async (req, res) => {
    try {
        const product = await Product.find({_id:req.params.id})
        if (!product) {
            res.status(404)
            throw new Error("No product found")
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})
export { fetchProductsHandler,fetchSingleProductHandler }