import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from 'dotenv'
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.KEY_GEMINI)

export async function classifier(msg) {
    const model = genAI.getGenerativeModel({model: 'gemini-pro'})
    const result = await model.generateContent(msg)
    const response = result.response
    const text = response.text()
    console.log(text);
}
classifier("Somos una pagina web de ventas online, tu mision es categorizar los comentarios referentes a los productos de la pagina, diciendo positivo, en caso de hacer referencia a aspectos positivos del producto, o negativo, en caso de hacer alucion a aspectos negativos del producto, adicionalmente quiero que me digas si el el comentario no tiene ninguna correlacion con el producto con la palabra clave, no aplica. Producto: carro, Comentario: aunque llego tarde me parece el producto del mundo aunque me puso asi emoji triste")