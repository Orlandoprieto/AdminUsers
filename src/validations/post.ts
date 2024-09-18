import * as z from 'zod'

export const post = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string()
})

export const createPost = post.pick({
    title: true,
    body: true
}).extend({
    title: z.string().min(2, { message: "El titulo debe tener al menos 2 caracteres" }),
    body: z.string().min(20, { message: "El contenido es muy corto" }),
})



