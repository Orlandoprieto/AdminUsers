import * as z from 'zod'

export const createUser = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    username: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Correo electrónico invalido" }),
    password: z.string().optional(),
    role: z.enum(['admin', 'user'], { message: "Debe seleccionar uno de los siguientes roles: admin, user" }).optional(),
})

export const loginUser = createUser.pick({
    email: true,
    password: true,
}).extend({
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

