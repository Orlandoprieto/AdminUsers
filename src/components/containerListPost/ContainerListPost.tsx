import { useEffect, useState } from "react"
import { User } from "../../validations/user"
import { recoverPost, recoverUsers } from "../../config/utils"
import CardPost from "../cardPosts/CardPost"
import './containerListPostStyles.css'
import { ButtonPrimary } from "../button/Button"
import { useContext } from "react"
import { routesContentContext } from "../../context/routesContentContext"

import { Post } from "../../validations/post"

interface ContainerListPostProps {
    goCreatePost : (content: string) => void
}

export default function ContanierListPosts({goCreatePost} : ContainerListPostProps) {
    const usersStorage = recoverUsers()
    const postStorage = recoverPost()

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
        <div className="cardContainerPost">
            <div className="actions">
                <div>
                    <select onChange={handleChange}>
                        <option value="todos">Todos</option>
                        {users.filter(user => user.role == 'admin').map(user => (
                            <option value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <ButtonPrimary title="Crear post" handlerClick={() => goCreatePost("createPost")}/>
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