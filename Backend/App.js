
import express, { application } from "express"
import dotenv from "dotenv"
import path from 'path'
import { products } from "./Data/products.js"
import { connectDb } from "./Config/DbConnect.js"
import { notFound, errorHandler } from "./Middleware/ErrorMiddleware.js"
import { productRouter } from "./Routes/ProductRoutes.js"
import { userRoute } from "./Routes/UserRoutes.js"
const server = express()
dotenv.config()
connectDb()

const port = process.env.PORT
server.use(express.json())
server.use("/api/products",productRouter)
server.use("/api/users",userRoute)
const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    server.use(express.static(path.join(__dirname, '/client/build')))
    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
server.use(notFound);
server.use(errorHandler);


server.listen(port,()=>{console.log(`connection running on port ${port}`)})