import { FIELD_USER_SESION, FIELD_USERS_IN_STORAGE, FIELD_POSTS_IN_STORAGE  } from "./const";
import { User } from "../validations/user";
import { Post } from "../validations/post";


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

export function recoverPost(): Post[] {
    const userJson = localStorage.getItem(FIELD_POSTS_IN_STORAGE)

    if (!userJson) return []

    const users = JSON.parse(userJson)

    return users as Post[]
}

export function closeSesionUser() {
    localStorage.removeItem(FIELD_USER_SESION)
}

export function createUser(user: User){
    const users = recoverUsers()
    
    users.push(user)

    localStorage.setItem(FIELD_USERS_IN_STORAGE, JSON.stringify(users))
}


export function createPost(post: Post){
    const users = recoverPost()
    
    users.push(post)

    localStorage.setItem(FIELD_POSTS_IN_STORAGE, JSON.stringify(users))
}
