import { db } from "../models/db.js";

export async function createUser(userData, hashPassword){       
    const [rows] = await db.query('INSERT INTO users (user_name, user_password) VALUES (?,?)', [userData.userName, hashPassword])
    if(rows.affectedRows  == 0){
        return null
    }
    return "USER CREATED SUCCESSFULLY CREATED USER" 
}

export async function getUserByName(userName) {
    const [result] = await db.query('SELECT * FROM users WHERE user_name = ?', [userName])
    if(result.length  == 0){
        return null
    }
    return result[0]
}