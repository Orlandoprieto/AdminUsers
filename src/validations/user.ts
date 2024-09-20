import * as z from 'zod'

export const user = z.object({
    id: z.number(),
    name: z.string().min(1, { message: "Completa el nombre" }).default(''),
    username: z.string().min(2, { message: "Falta el nombre del usuario" }).default(''),
    email: z.string().email({ message: "Correo electrónico nulo o invalido" }).default(''),
    password: z.string().default(''),
    role: z.enum(['admin', 'user'], { message: "Debe seleccionar uno de los siguientes roles: admin, user" }).optional(),
})

export const createUser = user.extend({
    password: z.string().optional(),
})


export const loginUser = z.object({
    email: z.string().min(1,{ message: "El correo es requerido." }).default(''),
    password: z.string().min(1, { message: "La contraseña es requerida" }).default(''),
})


export type User = z.infer<typeof user>
