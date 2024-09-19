import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { recoverLogin } from "../../config/utils"
import './dashboardStyles.css'
import { ButtonSecondary } from "../../components/button/Button"
import ContanierListUsers from "../../components/containerListUser/ContanierListUsers"

// @ts-ignore
import iconuser from '../../assets/icon_users.png'
// @ts-ignore
import iconAdmin from '../../assets/iconAdmin.png'
// @ts-ignore
import iconPosts from '../../assets/iconPosts.png'
// @ts-ignore
import iconExit from '../../assets/exit.png'

//TYPES
import { User } from "../../validations/user"

export default function DashboardAdmin() {
   const navigate = useNavigate()
   const [userLogged, setUserLogged] = useState<User | null>(null)

   useEffect(() => {
      const user = recoverLogin()

      if (!user) {
         navigate('/error');
         return
      }

      setUserLogged(user)
   }, []);


   const buttons = [
      {
         title: "Administrar usuarios",
         icon: iconuser
      },
      {
         title: "Ver posts",
         icon: iconPosts
      }
   ]

   return (
      <div className="dashboarAdmin">
         <header className="containerHeader">
            <div className="dataUser">
               <div className='container_img'>
                  <img src={iconAdmin} alt="" />
               </div>
               <div className='info_user'>
                  <strong>Hola, {userLogged?.name}</strong>
                  <span>{userLogged?.email}</span>
               </div>
            </div>

            <div className="dataControls">
               {buttons.map(button => (
                  <ButtonSecondary {...button}/>
               ))}
            </div>

            <div className="configControls">
               <ButtonSecondary title="Terminar sesion" icon={iconExit}/>
            </div>

         </header>

         <div className="visualized_data">
            <ContanierListUsers />
         </div>
      </div>
   )
}

