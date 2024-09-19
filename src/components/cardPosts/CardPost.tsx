import { Post } from "../../validations/post"
import './cardPostStyles.css'
import {  ButtonSecondary } from "../button/Button"

// @ts-ignore
import iconDelete from '../../assets/icon_delete.png'
// @ts-ignore
import iconuser from '../../assets/icon_users.png'
// @ts-ignore
import iconAdmin from '../../assets/iconAdmin.png'
import { User } from "../../validations/user"

interface CardProps {
    post: Post;
    user?: User
}

export default function CardPost({ post, user }: CardProps) {
    return (
        <div className="cardPost">
            <div className="user_post">
                <img className="avatar_user" />
                <span>{user?.username}</span>
            </div>

            <div className="title_post">
                <span>{post.title}</span>
            </div>

            <div className="body_post">
                <span>{post.body}</span>
            </div>

            <div className="type_User">
                <ButtonSecondary icon={iconDelete}/>
            </div>
        </div>
    )
}
