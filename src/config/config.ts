import { 
    FIELD_POSTS_IN_STORAGE, 
    FIELD_USERS_IN_STORAGE 
} from './const'
import fetchUsers from '../services/fetchUsers'
import { recoverUsers } from './utils'
//import fetchPost from '../services/fetchPosts'

export function configInit() {
    createStores()

    fetchUsers()
        .then(users => {
            saveFetchInStorage(FIELD_USERS_IN_STORAGE, users)
        })

    // fetchPost()
    //     .then(posts => saveFetchInStorage(FIELD_POSTS_IN_STORAGE, posts))
}

function createStores()  {
    const users = localStorage.getItem(FIELD_USERS_IN_STORAGE)
    const post = localStorage.getItem(FIELD_POSTS_IN_STORAGE)

    if (!users) {
        localStorage.setItem(FIELD_USERS_IN_STORAGE, JSON.stringify([]))
    }

    if (!post) {
        localStorage.setItem(FIELD_POSTS_IN_STORAGE, JSON.stringify([]))
    }
}

function saveFetchInStorage(field: string, data: any) {
    const users = recoverUsers()

    if(users.length > 0) return

    const dataString = JSON.stringify(data)

    localStorage.setItem(field, dataString)
}