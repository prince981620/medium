import z from "zod";

export const signupInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6)
})
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
export const createblogInput = z.object({
    title: z.string(),
    content: z.string(),
})
export const updateblogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateblogInput = z.infer<typeof createblogInput>
export type UpdateblogInput = z.infer<typeof updateblogInput>