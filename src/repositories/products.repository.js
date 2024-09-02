import { db } from '../models/db.js';

export async function getProductByName(productName) {
    const [result] = await db.query('SELECT * FROM products WHERE product_name = ?', [productName])
    if (result.length === 0) {
        return null
    }
    return result[0]
}

export async function getAllProducts() {
    const [result] = await db.query('SELECT * FROM products')
    if(result.length == 0) {
        return null
    }
    return result
}

export async function createProduct(productData) {
    try{
        const [rows] = await db.query('INSERT INTO products (product_name, product_description, product_photo, product_price) VALUES (?,?,?,?)', 
            [productData.productName, productData.productDescription,productData.productPhoto, productData.productPrice])
            if(rows.affectedRows  == 0){
                return null
            }
            return rows
    }catch(err){
        console.log(err);
        
    }
}