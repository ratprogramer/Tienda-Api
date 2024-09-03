import { getProductByName, getAllProducts, createProduct } from "../repositories/products.repository.js"
import { getCommentsController } from "./comments.controller.js"
import { productSchema } from "../schemas/product.schema.js"
import { assistant } from "../utils/assistant.js"
import z from "zod"

export async function getAllProductsController(req, res) {
  try {
    const products = await getAllProducts()
    if (!products) {
      return res.status(404).json({ message: "PRODUCTS NOT FOUND" })
    }
    const updatedProducts = await products.map( row => ({
      id: row.id,
      product_name: row.product_name,
      product_description: row.product_description,
      product_price: row.product_price,
      product_category: row.product_category,
      product_photo: `data:image/jpeg;base64,${row.product_photo.toString('base64')}`
    }))              
    res.status(200).json({ message: "SUCCESS BRINGING ALL THE PRODUCTS", products: updatedProducts })
  }catch (err) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR", error: err.message })
  }
}

export async function createProductController(req, res) {
  try {
    const productData = {
      ...req.body,
      productPhoto: req.file.buffer
    }
    const parsedData = productSchema.parse(productData)
    const result = await createProduct(parsedData)
    if (!result) {
      return res.status(404).json({ message: "ERROR CREATING THE PRODUCT" })
    }
    res.status(201).json({ message: "SUCCESSFULLY CREATED PRODUCT" })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(403).json({ message: "Validation error", error: err.errors })
    }
    res.status(500).json({ message: "INTERNAL SERVER ERROR", error: err.message })
  }
}

export async function getOneProductController(req, res) {
  try {
    const productName = decodeURIComponent(req.params.articulo)
    const product = await getProductByName(productName)
    if (!product) {
      return res.status(404).json({ message: "PRODUCT NOT FOUND" })
    }
    product.product_photo = `data:image/jpeg;base64,${product.product_photo.toString("base64")}`
    const comments = await getCommentsController(productName)
    res.status(200).json({message: `SUCCESS BRINGING THE PRODUCT ${productName}`,product: product, comments: comments,})
  } catch (err) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR", error: err.message })
  }
}

export async function getSuggestionsController(req, res) {
  try {
    const productName = decodeURIComponent(req.params.articulo)
    const product = await getProductByName(productName)
    if (!product) {
        return res.status(404).json({ message: "PRODUCT NOT FOUND" })
    }
    const comments = await getCommentsController(productName)
    if (!comments) {
        return res.status(404).json({ message: "COMMENTS NOT FOUND" })
    }
    const commentString = await comments.map( comment => comment.comment_text).join('')
    const respuesta = await assistant(commentString, product)
    res.status(200).json({respuesta})
    } catch (err) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" })
    }
}
