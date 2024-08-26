import { GoogleGenerativeAI} from "@google/generative-ai"
import dotenv from "dotenv"
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.KEY_GEMINI)

export async function assistant(comentarios, product) {
    try{
        const model = genAI.getGenerativeModel({model: 'gemini-pro'})
        const prompt  = `Evalua este producto ${product.product_name}, con la descripcion ${product.product_description}. Ahora lee estos comentarios, divididos por ; cada uno y dime en que puede mejorar el producto, omite los comentarios que no tengan relacion con el producto. Comentarios: ${comentarios}`
        const result = await model.generateContent(prompt)
        const response = result.response
        
        return response.text()
    }catch (err){
        return err
    }
}












