import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {usersRouter} from "./routes/user.routes.js"
import {productsRouter} from "./routes/products.routes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/tienda-angarita', usersRouter)

app.use('/tienda-angarita', productsRouter)

app.listen(process.env.PORT, ()=> console.log("corriendo"))