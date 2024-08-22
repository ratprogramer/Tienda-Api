import express from "express"
import cors from "cors"

import {usersRouter} from "./routes/user.routes.js"
import {productsRouter} from "./routes/products.routes.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use('/tienda-angarita', usersRouter)

app.use('/tienda-angarita', productsRouter)

app.listen(3000, ()=> console.log("corriendo"))