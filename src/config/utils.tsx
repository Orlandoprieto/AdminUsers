import { FIELD_USER_SESION, FIELD_USERS_IN_STORAGE } from "./const";
import { User } from "../validations/user";

export function recoverLogin(): User | null {
    const userJson = localStorage.getItem(FIELD_USER_SESION)

    if (!userJson) return null

    const user = JSON.parse(userJson)

    return user as User
}

export function recoverUsers(): User[] {
    const userJson = localStorage.getItem(FIELD_USERS_IN_STORAGE)

    if (!userJson) return []

    const users = JSON.parse(userJson)

    return users as User[]
}

