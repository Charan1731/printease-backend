/* eslint-disable no-undef */
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Vendor from "../models/vendorSchema.js"
import { z } from "zod"
import dotenv from "dotenv"
dotenv.config()

const venderValidation = z.object({
    name:z.string().min(3).max(30),
    email:z.string().email(),
    password:z.string().min(6).max(30),
    confirmPassword:z.string().min(6).max(30)
}).refine(data => data.password == data.confirmPassword,{
    message: "Passwords do not match",
    path: ['confirmPassword']
})

export const vendorSignIn = async (req,res) => {
    const { email, password } = req.body;
    try {

        const user = await Vendor.findOne({email})
        if(!user){
            res.status(400).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            res.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_VENDOR,{expiresIn:process.env.JWT_EXPIRY})

        res.status(201).json({
            sucess:true,
            message: "Vendor signed in successfully",
            role:"Vendor",
            data:{
                token,
                user,
            }
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server errror"})
    }
}

export const vendorSignUp = async (req,res) => {
    const validateVendor = venderValidation.safeParse(req.body)
    if(!validateVendor){
        res.status(400).json({message:validateVendor.error.errors[0].message})
    }
    try {
        
        const { name, email ,password} = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await Vendor.create({name,email,password:hashedPassword})

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_VENDOR,{expiresIn:process.env.JWT_EXPIRY})

        res.status(201).json({
            sucess:true,
            message:"Vendor signed up successfully",
            data:{
                token,
                user:newUser
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const vendorSignOut = (req,res) => {
    res.status(201).json({message:"User signed out sucessfully"})
}