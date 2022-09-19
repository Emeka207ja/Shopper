import asyncHandler from "express-async-handler"
import { generateToken } from "../Config/GenerateToken.js";
import { User } from "../Model/UserModel.js"


const signUpHandler = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(403);
        throw new Error("fill all fields!")
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            res.status(406);
            throw new Error("email already in use")
        }
        const user = await User.create({
            name,
            email,
            password
        })
        res.status(201).json({
            id: user._id,
            email: user.email,
            token: generateToken(user._id),
            name:user.name
        })
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
   }
})

const signInHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(403);
        throw new Error("please fill out all fields")
    }
    try {
        const user = await User.findOne({ email: email });
        if (user && user.matchPassword(password)) {
            res.status(201).json({
                id: user._id,
                email: user.email,
                token: generateToken(user._id),
                name:user.name
            })
        } else {
            res.status(400);
            throw new Error("login unsuccesful")
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

const updateProfileHandler = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    console.log(name,email,password)
    try {
        const user = await User.findById(req.params.id)
        
        if (user) {
            user.name = name || user.name
                user.email = email || user.email
                if(password) {
                    user.password = password
            }
            await user.save()
            res.status(201).json({
                message: "profile updated"
            })
    
        }else{
            res.status(403)
            throw new Error("not permitted")
    }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
   }

})
const fetchProfileHandler = asyncHandler(async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(201).json({
                id: user._id,
                name: user.name,
                email:user.email
            })
        }else{
                res.status(403);
                throw new Error("not permitted")
            }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const sendPaystack = asyncHandler(async (req, res) => {
    res.status(200).json(process.env.PAYSTACK_PUBLIC_KEY)
})
export {signInHandler,signUpHandler,updateProfileHandler,fetchProfileHandler,sendPaystack}