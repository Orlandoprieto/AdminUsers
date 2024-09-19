import { User } from "../../validations/user"
import './cardUserStyles.css'
import {  ButtonPrimary, ButtonSecondary } from "../button/Button"

// @ts-ignore
import iconEdit from '../../assets/icon_edit.png'
// @ts-ignore
import iconuser from '../../assets/iconUser.png'
// @ts-ignore
import iconAdmin from '../../assets/iconAdmin.png'

interface CardProps {
    user: User;
    index: number 
}

export default function CardUser({ user, index }: CardProps) {
    return (
        <div className="cardUser">
            <div className="nunber_list">
                <span>{index + 1}</span>
            </div>

            <div className="name_user">
                <img className="avatar_user" src={user.role == "admin" ? iconAdmin : iconuser} alt="" />
                <span>{user.name}</span>
            </div>

            <div className="userName_user">
                <span>{user.username}</span>
            </div>

            <div className="type_User">
                <span>{user.role == 'admin' ? "Administrador" : "Usuario"}</span>
            </div>

            <div className="email_user">
                <span>{user.email}</span>
            </div>

            
        </div>
    )
}
