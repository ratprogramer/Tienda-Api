import { getProductByName, getAllProducts, createProduct } from "../services/products.services.js";
import { getCommentsController } from "./comments.controller.js"; 
import { productSchema } from "../schemas/product.schema.js";

export async function getAllProductsController(req, res){
    try{
        const products = await getAllProducts()
        if(!products){
            return res.status(404).json({message: "PRODUCTS NOT FOUND"})
        }
        products.forEach(product => {
            product.product_photo = Buffer.from(product.product_photo).toString('base64');
        });
        res.status(200).json({message: "SUCCESS BRINGING ALL THE PRODUCTS", products: products})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}

export async function createProductController(req, res) {
    try{
        const productData = productSchema.parse(req.body)
        
        const result = await createProduct(productData)
        if(!result){
            return res.status(404).json({message: "PRODUCT NOT FOUND"}) 
        }
        res.status(201).json({message: "SUCCESSFULLY CREATED PRODUCT"})
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}

export async function getOneProductController(req, res) {
    const productName = decodeURIComponent(req.params.articulo)
    try{
        const product = await getProductByName(productName)
        if(!product){
            return res.status(404).json({message: "PRODUCT NOT FOUND"})
        }
        product.product_photo = product.product_photo.toString('base64')
        const [comments] = await getCommentsController(productName)
        res.status(200).json({message: `SUCCESS BRINGING THE PRODUCT ${productName}`, product: product, comments: comments});
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}