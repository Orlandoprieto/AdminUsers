import * as z from 'zod'

export const person = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    lastname: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" })
})

export const user = person.extend({
    email: z.string().email({ message: "Correo electrónico invalido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    role: z.enum(['admin', 'user'], { message: "Debe seleccionar uno de los siguientes roles: admin, user" }),
})

export const userLogin = user.omit({
    role: true
})