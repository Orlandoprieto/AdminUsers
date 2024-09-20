import { Post, createPost } from "../../validations/post"

import './cardPostStyles.css'

// @ts-ignore
import iconAdmin from '../../assets/iconAdmin.png'
// @ts-ignore
import iconEdit from '../../assets/icon_edit.png'

import { User } from "../../validations/user"
import { ButtonSecondary, ButtonPrimary } from "../button/Button"
import { recoverLogin, recoverPost } from "../../config/utils"
import Form from "../form/Form"
import { useState } from "react"
import Input from "../input/Input"
import { FIELD_POSTS_IN_STORAGE } from "../../config/const"
import z from 'zod'

interface CardProps {
    post: Post;
    user?: User
}

export default function CardPost({ post, user }: CardProps) {
    const sessionUser = recoverLogin()
    const [editPost, setEditPost] = useState<boolean>(false)

    const savePost = (data: any) => {

        

        const dataPost = data as z.infer<typeof createPost>
        
        const posts = recoverPost()

        try {

            const validatePost = createPost.parse(data)

            const updatedPosts = posts.map(p => 
                p.id === post.id ? { ...p, ...validatePost } : p
            );
            

            console.log(data, "holaaaaa")
            console.log(posts, "HOLAAAAAAAAAAAAAAAAA")

            localStorage.setItem(FIELD_POSTS_IN_STORAGE, JSON.stringify(updatedPosts))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cardPost">
            <div>
                <div className="user_post">
                    <img className="avatar_user" src={iconAdmin} />
                    <span>{user?.name}</span>
                </div>

                {post.userId == sessionUser?.id && (
                    <div>
                        <ButtonSecondary icon={iconEdit} handlerClick={() => setEditPost(!editPost)} />
                    </div>
                )}
            </div>

            {!editPost && (
                <>
                    <div className="title_post">
                        <strong>{post.title}</strong>
                    </div>

                    <div className="body_post">
                        <span>{post.body}</span>
                    </div>
                </>
            )}

            {editPost && ( 
                <Form
                    handleSubmit={savePost}
                    render={({ handleChange }) => {
                        return (
                            <>
                                <Input value={post.title} type="text" field="Titulo" name="title" handleChange={handleChange} />
                                <Input value={post.body} type="text" field="Contenido" name="body" handleChange={handleChange} />
                                <ButtonPrimary isSubmit title="Guardar" />
                            </>
                        )
                    }}
                />
            )}
        </div>
    )
}
