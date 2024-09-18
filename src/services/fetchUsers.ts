import axios from "axios";
import { URL_USERS } from "../config/const"; 
import z from 'zod';
import { createUser } from "../validations/user";

const userArray = z.array(createUser);

export type UserArray = z.infer<typeof userArray>;

export default async function fetchUsers() {
    try {
        const response = await axios.get(URL_USERS);
        const data = response.data

        const dataParse = parser(data)

        console.log(dataParse)

        return dataParse
    } catch (error) {
        console.error(error)
    }
}

function parser(data: any) {
    try {
        const users = userArray.parse(data);

        return users.map(user => (
            {
                ...user,
                password: "123456",
                role: "admin"
            }
        ))

    } catch (error) {
        console.error('Error al parsear los usuarios:', error);
    }
}






