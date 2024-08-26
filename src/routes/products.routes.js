import { Router } from 'express'
import { getAllProductsController, createProductController, getOneProductController, getSuggestionsController } from '../controllers/products.controller.js'
import { createCommentController } from '../controllers/comments.controller.js'

const router = Router()

router.post('/home', createProductController)
router.get('/home', getAllProductsController)
router.get('/home/:articulo', getOneProductController)
router.post('/home/:articulo', createCommentController)
router.get('/home/:articulo/suggestions', getSuggestionsController)

export const productsRouter = router

