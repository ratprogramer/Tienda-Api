import z from "zod"

export const productSchema = z.object({
    productName: z.string().min(5, "The product name need at least 5 characters"),
    productDescription: z.string().min(5, "The description is required").max(300, "The max description length is 300"),
    productPrice: z.string(),
    productPhoto: z.instanceof(Buffer, "Invalid photo format")
})