import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from 'dotenv'
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.KEY_GEMINI)

export async function classifier(product, productDescription, coment) {
    try{
        const prompt = `Eres un clacificador de comentarios para una teinda online, debes evaluar comentarios y devolver 1 si el comentario es positivo hacia la pagina o el producto, y 0 si el comentario es negativo hacia la pagina o el producto, y dime 2 si el comentario no esta relacionado con el producto o el servicio de la pagina, incluyendo el envio, el sevicio al cliente y demas factores de un e comerce. El producto es ${product}, su descripcion es ${productDescription}, y el comentario es ${coment}`
        const model = genAI.getGenerativeModel({model: 'gemini-pro'})
        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text().trim()
        if(text == 1){
            return 1
        }else if (text == 0){
            return 0
        }
        else if( text == 2){
            return "THE COMMENT DONT APLLY"
        }
    }catch (err){
        return err
    }
}
