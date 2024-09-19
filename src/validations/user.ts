import * as z from 'zod'

export const user = z.object({
    id: z.number(),
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    username: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Correo electrónico invalido" }),
    password: z.string(),
    role: z.enum(['admin', 'user'], { message: "Debe seleccionar uno de los siguientes roles: admin, user" }).optional(),
})

export const createUser = user.extend({
    password: z.string().optional(),
})


export const loginUser = z.object({
    email: z.string().min(1,{ message: "El correo es requerido." }),
    password: z.string().min(1, { message: "La contraseña es requerida" }),
})


export type User = z.infer<typeof user>