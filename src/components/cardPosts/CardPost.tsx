import { Post } from "../../validations/post"
import './cardPostStyles.css'

// @ts-ignore
import iconAdmin from '../../assets/iconAdmin.png'
// @ts-ignore
import iconEdit from '../../assets/icon_edit.png'

import { User } from "../../validations/user"
import { ButtonSecondary, ButtonPrimary } from "../button/Button"
import { recoverLogin } from "../../config/utils"
import Form from "../form/Form"
import { useState } from "react"
import Input from "../input/Input"

interface CardProps {
    post: Post;
    user?: User
}



export default function CardPost({ post, user }: CardProps) {
    const sessionUser = recoverLogin()
    const [editPost, setEditPost] = useState<boolean>(false)

    return (
        <div className="cardPost">
            <div>
                <div className="user_post">
                    <img className="avatar_user" src={iconAdmin} />
                    <span>{user?.name}</span>
                </div>

                {post.userId == sessionUser?.id && (
                    <div>
                        <ButtonSecondary icon={iconEdit} handlerClick={() => setEditPost(!editPost)}/>
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
                    handleSubmit={() => console.log("editar post")}
                    render={({ handleChange }) => {
                        return (
                            <>
                                <Input type="text" field="Titulo" name="title" handleChange={handleChange} />
                                <Input type="text" field="Contenido" name="body" handleChange={handleChange} />
                                <ButtonPrimary isSubmit title="Guardar" />
                            </>
                        )
                    }}
                />
            )}
        </div>
    )
}
