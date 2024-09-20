import z from 'zod'

export const post = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string()
})

export const createPost = z.object({
    title: z.string().min(1, { message: "El titulo debe tener al menos 2 caracteres" }).default(''),
    body: z.string().min(1, { message: "El contenido es muy corto" }).default(''),
})

export type Post = z.infer<typeof post>
