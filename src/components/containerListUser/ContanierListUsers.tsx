import { useEffect, useState } from "react"
import { User } from "../../validations/user"
import { recoverUsers } from "../../config/utils"
import CardUser from "../cardUser/CardUser"
import './containerListUserStyles.css'
import { ButtonPrimary } from "../button/Button"



export default function ContanierListUsers() {
   const [users, setUsers] = useState<User[]>([])
   const [typeuser, setTypeUser] = useState<String>('todos')
   const [filterUsers, setFilterUsers] = useState<User[]>([])

   useEffect(() => {
      const users = recoverUsers()
      setUsers(users)
   }, [])

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
               <select onChange={handleChange}>
                  <option value="todos">Todos</option>
                  <option value="admin">Admistrador</option>
                  <option value="user">User</option>
               </select>
            </div>

            <div>
               <ButtonPrimary title="Crear usuario"/>
            </div>
         </div>

         <div className="list_users">
            {filterUsers.map((user, index) => (
               <CardUser user={user} index={index} />
            ))}
         </div>

      </div>
   )
}