import { GoogleGenerativeAI } from '@google/generative-ai'
import { configDotenv } from 'dotenv'
configDotenv()

const genAI = new GoogleGenerativeAI(process.env.KEY_GEMINI)

export async function verifyImage(req, res, next){
    try{
        
        const {productName, productDescription} = req.body
        if(!productName || !productDescription){
            return res.status(403).json({message: 'MISSING DATA'})
        }

        const img = `data:image/jpeg;data64${req.file.buffer.toString('base64')}`
        const prompt = `Esta imagen https://static.vecteezy.com/system/resources/previews/006/874/320/original/asd-letter-logo-design-on-black-background-initial-asd-asd-letter-design-asd-logo-vector.jpg coincide con uno o varios productos del tipo ${productName}? si no estas seguro puedes revisar tambien que coincida con esta descripcion: ${productDescription}, dime 'Coincide' si coincide, y 'No coincide' si no`
        const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'})
        const result = await model.generateContent(prompt)
        const response = result.response
        console.log(response.text())
        next()
    }catch(err){
        return res.status(500).json({ message: "INTERNAL SERVER ERROR", error: err.message })
    }
}