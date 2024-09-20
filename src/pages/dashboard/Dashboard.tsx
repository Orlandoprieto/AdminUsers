import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { recoverLogin } from "../../config/utils"
import './dashboardStyles.css'
import { ButtonPrimary, ButtonSecondary } from "../../components/button/Button"
import ContanierListPosts from "../../components/containerListPost/ContainerListPost"
import ContanierListUsers from "../../components/containerListUser/ContanierListUsers"
import fetchPost from "../../services/fetchPosts"
import { FIELD_POSTS_IN_STORAGE } from "../../config/const"

// @ts-ignore
import iconmenu from '../../assets/icon_menu.png'
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
import ContanierEditPost from "../../components/containerEdit/ContainerEditPost"
import { Post } from "../../validations/post"

export default function Dashboard() {
   const userLogged = recoverLogin()
   const [user, setUser] = useState<User | null>(userLogged)
   const navigate = useNavigate()

   useEffect(() => {
      fetchPost()
         .then(posts => {
            localStorage.setItem(FIELD_POSTS_IN_STORAGE, JSON.stringify(posts))
         })

      if (!userLogged) {
         navigate('/error');
         return
      }

      setUser(user)
   }, []);

   return (
      user?.role == 'admin'
         ? <DashboarAdmin user={user} />
         : <DashboarUser />
   )
}


function DashboarAdmin({ user }: { user: User }) {
   const [route, setRoute] = useState<string>("posts")

   //const { content } = useContext(routesContentContext)
   const [showMenu, setShowMenu] = useState<"flex" | "none">("flex")

   const handlerContent = (content: string) => {
      setRoute(content)
   }

   const renderContent = (content: string) => {
      switch (content) {
         // case "editPost":
         //    return <ContanierEditPost />
         case 'createUser':
            return <ContanierCreate create="user" />
         case 'createPost':
            return <ContanierCreate create="post" />
         case 'posts':
            return <ContanierListPosts goCreatePost={() => handlerContent('createPost')} />
         case 'users':
            return <ContanierListUsers goCreatePost={() => handlerContent('createUser')} />;
         default:
            return <ContanierListPosts goCreatePost={() => handlerContent('createPost')} />
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
         <button onClick={() => setShowMenu(prev => prev == 'flex' ? 'none' : 'flex')} className="btn_menu_movile">
            <img src={iconmenu} alt="" />
         </button>

         <header className="containerHeader" style={{ display: showMenu }}>
            <div className="dataUser">
               <div className='container_img'>
                  <img src={iconAdmin} alt="" />
               </div>
               <div className='info_user'>
                  <strong>Hola, {user.name}</strong>
                  <span>{user.email}</span>
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

function DashboarUser() {
   return (
      <ContanierListPosts />
   )
}
