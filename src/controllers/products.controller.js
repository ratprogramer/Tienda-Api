import { db } from "../config/db.config.js";

export async function getAllProducts(req, res){
    try{
        const [result] = await db.query('SELECT * FROM products')
        if(result.length == 0) {
            return res.status(404).json({message: "PRODUCTS NOT FOUND"})
        }
        result.forEach(product => {
            product.product_photo = Buffer.from(product.product_photo).toString('base64');
        });
        res.status(200).json({message: "SUCCESS BRINGING ALL THE PRODUCTS", products: result})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}


export async function createProduct(req, res) {
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
}

export async function getOneProduct(req, res) {
    const productName = decodeURIComponent(req.params.articulo)
    try{
        const [result] = await db.query('SELECT * FROM products WHERE product_name = ?', [productName])
        if(result.length == 0) {
            return res.status(404).json({message: "PRODUCT NOT FOUND"})
        }
        const product = result[0];
        product.product_photo = product.product_photo.toString('base64')
        res.status(200).json({message: `SUCCESS BRINGING THE PRODUCT ${productName}`, product: product});
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}