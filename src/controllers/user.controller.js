import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { createUser, getUserByName } from "../services/users.services.js";


export async function userRegister (req,res) {
    const  userData  = req.body
    try{
        if(!userData.userName || !userData.userPassword){
            return res.status(403).json({message:"MISSING DATA"})
        }
        const hashPassword = await bcrypt.hash(userData.userPassword, 10)
        const message = await createUser(userData, hashPassword)
        if(!message){
            return res.status(400).json({message: "BAD REQUEST"})
        }
        res.status(201).json({message: "SUCCESSFULLY CREATED USER"})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}

export async function userLogin (req,res, next) {
    const userData  = req.body
    try{
        if(!userData){
            return res.status(403).json({message:"MISSING OBJECT"})
        }
        if(!userData.userName || !userData.userPassword){
            return res.status(403).json({message:"MISSING DATA"})
        }
        const user = await getUserByName(req, res, next, userData.userName)
        if(!user){
            res.status(401).json({message: "USER NOT FOUND"})
        }
        const compare = await bcrypt.compare(userData.userPassword, user.user_password)
        if(compare){
            const token = jwt.sign({user: user}, process.env.SECRET_KEY, {expiresIn: "1h"})
            return res.status(200).json({message: "SUCCESSFUL LOGIN", token: token, user: user})
        }
        res.status(200).json({message: "WRONG PASSWORD"})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}
