import { useEffect, useState } from "react"
import { User } from "../../validations/user"
import { recoverLogin, recoverPost, recoverUsers } from "../../config/utils"
import CardPost from "../cardPosts/CardPost"
import './containerListUserStyles.css'
import { ButtonPrimary } from "../button/Button"

import { Post } from "../../validations/post"

interface ContainerListPostProps {
    handlerClick : () => void,
    titleButton: string
}

export default function ContanierListPosts({handlerClick, titleButton} : ContainerListPostProps) {
    const usersStorage = recoverUsers()
    const postStorage = recoverPost()
    const session = recoverLogin()
    const [users, setUsers] = useState<User[]>(usersStorage)
    const [posts, setPosts] = useState<Post[]>(postStorage)
    const [postsOfUser, setPostOfUser] = useState<string | number>('todos')
    const [filterPosts, setFilterPost] = useState<Post[]>([])

    //const {chageContent} = useContext(routesContentContext)

    useEffect(() => {
        if (postsOfUser == "todos") {
            setFilterPost(posts)
            return
        }

        const filter = posts.filter(post => post.userId == postsOfUser)

        setFilterPost(filter)
    }, [postsOfUser])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPostOfUser(parseInt(e.target.value));
        console.log(e.target.value)
    };

    return (
        <div className="containerCardUser">
            <div className="actions">
                <div>
                    <select onChange={handleChange}>
                        <option value="todos">Todos</option>
                        {users.filter(user => user.role == 'admin').map(user => (
                            <option value={user.id}>{user.id == session?.id ? "Mis posts" : user.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <ButtonPrimary title={titleButton} handlerClick={() => handlerClick()}/>
                </div>
            </div>

            <div className="list_post">
                {filterPosts.map(post => (
                    <CardPost user={users.find(user => user.id == post.userId)} post={post} />
                ))}
            </div>
        </div>
    )

}