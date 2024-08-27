import { GoogleGenerativeAI} from "@google/generative-ai"
import dotenv from "dotenv"
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.KEY_GEMINI)

export async function assistant(comentarios, product) {
    try{
        const model = genAI.getGenerativeModel({model: 'gemini-pro'})
        const prompt  = `Evalúa este producto: "${product.product_name}", con la siguiente descripción: "${product.product_description}". A continuación, leerás los comentarios de los usuarios, divididos por ";" comentarios: "${comentarios}". Proporcióname en un solo parrafo y de forma directa, basandote en los comentarios relacionados con el producto, las sugerencias que tienes para el vendedor, si en vez de comentarios, recibes un +, basate en la despripcion del producto y da tu sugerencias en un solo parrafo de igual forma.`
        const result = await model.generateContent(prompt) 
        const response =  result.response
        const text = response.text()
        console.log(text);
        return text
    }catch (err){
        return err
    }
}












