import { Router } from 'express'
import { getAllProductsController, createProductController, getOneProductController } from '../controllers/products.controller.js'
import { createComment } from '../controllers/coments.controller.js'

const router = Router()

router.post('/home', createProductController)
router.get('/home', getAllProductsController)
router.get('/home/:articulo', getOneProductController)
router.post('/home/:articulo', createComment)

export const productsRouter = router

