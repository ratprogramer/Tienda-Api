import { z } from "zod"

export const userSchema = z.object({
    userName: z.string().min(5, "A valid name is required"),
    userPassword: z.string().regex(/[!@#$%^&*(),.?":{}|<>]/,"Password must contain at least one special character" ).min(6, "A valid password is required")
})



