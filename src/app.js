import express from "express"
import mysql from "mysql2/promise"
import cors from "cors"
import dotenv from "dotenv"
import { GenerativeModel} from '@google/generative-ai'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"


const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

const db = await mysql.createConnection({ //Importante el await para manejar las consultas con promesas
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

app.post('/tienda-angarita/register', async (req,res) => {
    const { userName, userPassword } = req.body
    try{
        if(!userName || !userPassword){
            return res.status(403).json({message:"MISSING DATA"})
        }
        const hashPassword = await bcrypt.hash(userPassword, 10)
        const [rows] = await db.query('INSERT INTO users (user_name, user_password) VALUES (?,?)', [userName, hashPassword])
        if(rows.affectedRows  == 0){
            return res.status(404).json({message: "FAILED INSERT"})
        }
        res.status(201).json({message: "SUCCESSFULLY CREATED USER"})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
})

app.post('/tienda-angarita/login', async (req,res) => {
    const { userName, userPassword } = req.body
    try{
        if(!userName || !userPassword){
            return res.status(403).json({message:"MISSING DATA"})
        }
        const [result] = await db.query('SELECT * FROM users WHERE user_name = ?', [userName])
        if(result.length  == 0){
            return res.status(404).json({message: "WRONG USER"})
        }
        const user = result[0]
        const savedPassword = user.user_password
        const compare = await bcrypt.compare(userPassword, savedPassword)
        if(compare){
            const token = jwt.sign({user: user}, process.env.SECRET_KEY, {expiresIn: "1h"})
            return res.status(200).json({message: "SUCCESSFUL LOGIN", token: token})
        }
        res.status(200).json({message: "WRONG PASSWORD"})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
})

app.get('/tienda-angarita/home', async (req, res) => {
    try{
        const [result] = await db.query('SELECT * FROM products')
        if(result.length == 0) {
            return res.status(404).json({message: "PRODUCTS NOT FOUND"})
        }
        res.status(200).json({message: "SUCCESS BRINGING ALL THE PRODUCTS", products: result})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
})

app.post('/tienda-angarita/home', async (req, res) => {
    const {productImg, productName, productDescription, productPrice} = req.body
    try{
        if(!productImg || !productName || !productDescription || !productPrice){
            return res.status(403).json({message:"MISSING DATA"})
        }
        const [rows] = await db.query('INSERT INTO products (product_name, product_description, product_price, product_photo) VALUES (?,?,?,?)', [productImg, productName, productDescription, productPrice])
        if(rows.affectedRows  == 0){
            return res.status(404).json({message: "FAILED INSERT"})
        }
        res.status(201).json({message: "SUCCESSFULLY CREATED PRODUCT"})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
})

app.listen(3000, ()=> console.log("corriendo"))