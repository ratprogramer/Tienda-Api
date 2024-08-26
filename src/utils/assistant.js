import { GoogleGenerativeAI} from "@google/generative-ai"
import dotenv from "dotenv"
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.KEY_GEMINI)

export async function assistant(params) {
    const model = genAI.getGenerativeModel({model: 'gemini-pro'})
    const prompt  = "A"
}














