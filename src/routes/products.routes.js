import { Router } from 'express'
import { getAllProductsController, createProductController, getOneProductController, getSuggestionsController } from '../controllers/products.controller.js'
import { createCommentController } from '../controllers/comments.controller.js'
import { upload } from '../utils/upload.js'
import { verifyImage } from '../utils/verifyImage.js'
const router = Router()

router.post('/home', upload.single('productPhoto'), createProductController)
router.get('/home', getAllProductsController)
router.get('/home/:articulo', getOneProductController)
router.post('/home/:articulo', createCommentController)
router.get('/home/:articulo/suggestions', getSuggestionsController)

export const productsRouter = router

