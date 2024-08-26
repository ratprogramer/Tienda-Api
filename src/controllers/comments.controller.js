import { getProductByName } from "../services/products.services.js";
import { classifier } from "../utils/clasificador.js";
import { createComment, getCommets } from "../services/comments.services.js";


export async function createCommentController(req,res) {
    const productName = decodeURIComponent(req.params.articulo)
    const commentData = req.body
    try{
        const product = await getProductByName(productName)
        commentData.type = await classifier(product.product_name, product.product_description, commentData.text ) 
        if (commentData.type != 1 && commentData.type != 0){
            return res.status(404).json({error: commentData.type})
        }
        const result = await createComment(commentData)
        if(!result){
            return res.status(404).json({message: "WRONG COMMENT FORMAT"})
        }
        return res.status(200).json({message: `SUCCESS COMMENT IN THE PRODUCT ${productName}`});
    } catch (err){
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}

export async function getCommentsController(productName){
    const comments = await getCommets(productName)
    return comments
}
