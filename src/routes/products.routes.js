import { Router } from 'express'
import { getAllProducts, getOneProduct, createProduct } from '../controllers/products.controller.js'

const router = Router()

router.post('/home', createProduct)
router.get('/home', getAllProducts)
router.get('/home/:articulo', getOneProduct)

export const productsRouter = router

