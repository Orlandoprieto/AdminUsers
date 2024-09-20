import { useEffect, useState } from "react"
import { User } from "../../validations/user"
import { recoverUsers } from "../../config/utils"
import CardUser from "../cardUser/CardUser"
import './containerListUserStyles.css'
import { ButtonPrimary } from "../button/Button"

interface ContainerListPostProps {
   goCreatePost : (content: string) => void
}

export default function ContanierListUsers( {goCreatePost} : ContainerListPostProps ) {

   const usersStorage = recoverUsers()

   const [users, setUsers] = useState<User[]>(usersStorage)
   const [typeuser, setTypeUser] = useState<string>('todos')
   const [filterUsers, setFilterUsers] = useState<User[]>([])

   useEffect(() => {
      if (typeuser == "todos") {
         setFilterUsers(users)
         return
      }

      const filter = users.filter(user => user.role == typeuser)

      setFilterUsers(filter)
   }, [typeuser])

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTypeUser(e.target.value);
   };

   return (
      <div className="containerCardUser">
         <div className="actions">
            <div>
               <select value={typeuser} onChange={handleChange}>
                  <option value="todos">Todos</option>
                  <option value="admin">Admistrador</option>
                  <option value="user">User</option>
               </select>
            </div>

            <div>
               <ButtonPrimary title="Crear usuario" handlerClick={ () => goCreatePost("createUser")}/>
            </div>
         </div>

         <div className="list_users">
            {
               filterUsers.length > 0 
                  ? filterUsers.map((user, index) => <CardUser user={user} index={index} />)
                  : <span>No se encontraron Usuarios</span>
            }
         </div>

      </div>
   )
}