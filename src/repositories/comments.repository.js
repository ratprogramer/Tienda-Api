import { db } from "../models/db.js";

export async function createComment(commentData) {
    const [rows] = await db.query('INSERT INTO comments (comment_text, user_id, product_id, comment_type) VALUES (?,?,?,?)', [commentData.text, commentData.userID, commentData.productID, commentData.type])
    if(rows.affectedRows  == 0){
        return null
    }
    return rows
}

export async function getCommets(productName) {
    const [result] = await db.query('SELECT u.user_name, c.comment_text, c.comment_type FROM comments c JOIN users u ON c.user_id = u.id JOIN products p ON c.product_id = p.id WHERE p.product_name = ?', [productName])
    if (result.length === 0) {
        return null
    }
    return result;
}