import { db } from "../config/db.config.js";
import { getProductByName } from "../services/products.services.js";
import { classifier } from "../utils/clasificador.js";


export async function createComment(req,res) {
    const productName = decodeURIComponent(req.params.articulo)
    const commentData = req.body
    try{
        const product = await getProductByName(productName)
        const type = await classifier(product.product_name, product.product_description, commentData.text ) 
        if (type == 'No aplica'){
            return res.status(404).json({error: "THE COMMENT DONT APLLY"})
        }
        const [rows] = await db.query('INSERT INTO comments (comment_text, user_id, product_id, comment_type) VALUES (?,?,?,?)', [commentData.text, commentData.userID, commentData.productID, type])
        if(rows.affectedRows == 0) {
            return res.status(404).json({message: "WRONG COMMENT FORMAT"})
        }
        return res.status(200).json({message: `SUCCESS COMMENT IN THE PRODUCT ${productName}`});
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}

export async function getComments(productName){
    return await db.query('SELECT u.user_name, c.comment_text, c.comment_type FROM comments c JOIN users u ON c.user_id = u.id JOIN products p ON c.product_id = p.id WHERE p.product_name = ?', [productName])
}
