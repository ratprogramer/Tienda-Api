import { z } from "zod"

export const commentSchema = z.object({
    text: z.string().min(10, "The min length for comments is 10"),
    userID: z.number(),
    productID: z.number()
})