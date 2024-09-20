import { Post } from "../../validations/post"
import './cardPostStyles.css'

// @ts-ignore
import iconAdmin from '../../assets/iconAdmin.png'
// @ts-ignore
import iconEdit from '../../assets/icon_edit.png'

import { User } from "../../validations/user"
import { ButtonSecondary } from "../button/Button"
import { recoverLogin } from "../../config/utils"

interface CardProps {
    post: Post;
    user?: User
}

export default function CardPost({ post, user }: CardProps) {
    const sessionUser = recoverLogin()

    const viewPost = () => {

    }

    return (
        <div className="cardPost" onClick={viewPost}>
            <div>
                <div className="user_post">
                    <img className="avatar_user" src={iconAdmin} />
                    <span>{user?.name}</span>
                </div>

                {post.userId == sessionUser?.id && (
                    <div>
                        <ButtonSecondary icon={iconEdit} />
                    </div>
                )}
            </div>

            <div className="title_post">
                <strong>{post.title}</strong>
            </div>

            <div className="body_post">
                <span>{post.body}</span>
            </div>
        </div>
    )
}
