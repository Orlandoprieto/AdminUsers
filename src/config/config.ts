import { 
    FIELD_POSTS_IN_STORAGE, 
    FIELD_USERS_IN_STORAGE 
} from './const'
import fetchUsers from '../services/fetchUsers'
import fetchPost from '../services/fetchPosts'


function createStores() {
    const users = localStorage.getItem(FIELD_USERS_IN_STORAGE)
    const post = localStorage.getItem(FIELD_POSTS_IN_STORAGE)

    if (!users) {
        localStorage.setItem(FIELD_USERS_IN_STORAGE, JSON.stringify([]))
    }

    if (!post) {
        localStorage.setItem(FIELD_POSTS_IN_STORAGE, JSON.stringify([]))
    }
}

export function configInit() {
    createStores()
    fetchUsers()
    fetchPost()
}