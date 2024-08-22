import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { db } from "../config/db.config.js";

export async function userRegister (req,res) {
    const  userData  = req.body
    try{
        if(!userData.userName || !userData.userPassword){
            return res.status(403).json({message:"MISSING DATA"})
        }
        const hashPassword = await bcrypt.hash(userData.userPassword, 10)
        const [rows] = await db.query('INSERT INTO users (user_name, user_password) VALUES (?,?)', [userData.userName, hashPassword])
        if(rows.affectedRows  == 0){
            return res.status(404).json({message: "FAILED INSERT"})
        }
        res.status(201).json({message: "SUCCESSFULLY CREATED USER"})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}

export async function userLogin (req,res) {
    const { userData } = req.body
    try{
        if(!userData){
            return res.status(403).json({message:"MISSING OBJECT"})
        }
        if(!userData.userName || !userData.userPassword){
            return res.status(403).json({message:"MISSING DATA"})
        }
        const [result] = await db.query('SELECT * FROM users WHERE user_name = ?', [userData.userName])
        if(result.length  == 0){
            return res.status(404).json({message: "WRONG USER"})
        }
        const user = result[0]
        const savedPassword = user.user_password
        const compare = await bcrypt.compare(userData.userPassword, savedPassword)
        if(compare){
            const token = jwt.sign({user: user}, process.env.SECRET_KEY, {expiresIn: "1h"})
            return res.status(200).json({message: "SUCCESSFUL LOGIN", token: token, user: user})
        }
        res.status(200).json({message: "WRONG PASSWORD"})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}
