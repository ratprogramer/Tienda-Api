import { getProductByName } from "../repositories/products.repository.js"
import { classifier } from "../utils/classifier.js"
import { createComment, getCommets } from "../repositories/comments.repository.js"
import { commentSchema } from "../schemas/comment.schema.js"
import z from 'zod'

export async function createCommentController(req,res) {
    try{
        const productName = decodeURIComponent(req.params.articulo)
        const product = await getProductByName(productName)
        req.body.productID = product.id
        const commentData = commentSchema.parse(req.body)
        if(!product){
            return res.status(404).json({message: "PRODUCT NOT FOUND"})
        }
        commentData.type = await classifier(product.product_name, product.product_description, commentData.text ) 
        if (commentData.type != 1 && commentData.type != 0){
            return res.status(404).json({message:"Comment error",error: commentData.type})
        }
        
        const result = await createComment(commentData)
        if(!result){
            return res.status(500).json({message: `ERROR CREATING THE COMMENT IN ${productName}`})
        }
        return res.status(200).json({message: `SUCCESS COMMENT IN THE PRODUCT ${productName}`})
    } catch (err){
        if(err instanceof z.ZodError){
            return res.status(403).json({message: "Validation error", error: err.errors})
        }
        res.status(500).json({message: "INTERNAL SERVER ERROR", error: err.message})
    }
}

export async function getCommentsController(productName){
    const comments = await getCommets(productName)
    return comments
}
