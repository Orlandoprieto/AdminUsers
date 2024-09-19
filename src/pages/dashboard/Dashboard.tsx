import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { recoverLogin } from "../../config/utils"
import './dashboardStyles.css'
import { ButtonSecondary } from "../../components/button/Button"
import ContanierListPosts from "../../components/containerListPost/ContainerListPost"
import ContanierListUsers from "../../components/containerListUser/ContanierListUsers"
import fetchPost from "../../services/fetchPosts"
import { FIELD_POSTS_IN_STORAGE } from "../../config/const"

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
import ContanierCreate from "../../components/containerCreate/ContainerCreate"


export default function DashboardAdmin() {
   const [route, setRoute] = useState<string>("posts")
   const navigate = useNavigate()
   const [userLogged, setUserLogged] = useState<User | null>(null)

   useEffect(() => {
      fetchPost()
         .then(posts => {
            localStorage.setItem(FIELD_POSTS_IN_STORAGE, JSON.stringify(posts))
         })

      const user = recoverLogin()
      
      if (!user) {
         navigate('/error');
         return
      }

      setUserLogged(user)
   }, []);

   const handlerContent = (content: string) => {
      setRoute(content)
   }

   const renderContent = (content: string) => {
      switch (content) {
         case 'createUser': 
            return <ContanierCreate create="user" />
         case 'createPost': 
            return <ContanierCreate create="post" />
         case 'posts':
            return <ContanierListPosts goCreatePost={handlerContent}/>
         case 'users':
            return <ContanierListUsers goCreatePost={handlerContent}/>;
         default:
            return <ContanierListPosts goCreatePost={handlerContent}/>
      }
   };

   const buttons = [
      {
         title: "Administrar usuarios",
         icon: iconuser,
         handlerClick: () => handlerContent("users")
      },
      {
         title: "Ver posts",
         icon: iconPosts,
         handlerClick: () => handlerContent("posts")
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
                  <ButtonSecondary {...button} />
               ))}
            </div>

            <div className="configControls">
               <ButtonSecondary title="Terminar sesion" icon={iconExit} />
            </div>

         </header>

         <div className="visualized_data">
            {renderContent(route)}
         </div>
      </div>
   )
}

