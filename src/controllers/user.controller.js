import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { createUser, getUserByName } from "../services/users.services.js";
import { userSchema } from "../schemas/user.schema.js";
import z from 'zod';

export async function userRegister (req,res) {
    try{
        const userData = userSchema.parse(req.body)
        const hashPassword = await bcrypt.hash(userData.userPassword, 10)
        const message = await createUser(userData, hashPassword)
        if(!message){
            return res.status(400).json({message: "BAD REQUEST"})
        }
        res.status(201).json({message: "SUCCESSFULLY CREATED USER"})
    } catch (err){
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation error", errors: err.errors });
        }
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}

export async function userLogin (req,res, next) {
    try{
        const userData = userSchema.parse(req.body)
        const user = await getUserByName(userData.userName)
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
        if(err instanceof z.ZodError){
            return res.status(400).json({ message: "Validation error", errors: err.errors });
        }
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}
