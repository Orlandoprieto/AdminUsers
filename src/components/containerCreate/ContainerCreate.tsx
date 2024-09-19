import './ContainerCreateStyles.css'
import { ButtonPrimary } from "../button/Button"
import Form from "../form/Form"
import Input from "../input/Input"
import { createUser, createPost, recoverUsers, recoverLogin, recoverPost } from '../../config/utils'
import { user } from '../../validations/user'
import { post } from '../../validations/post'
import { PASSWORD_DEFAULT } from '../../config/const'


interface ContainerListPostProps {
   create: "post" | "user"
}

export default function ContanierCreate({ create }: ContainerListPostProps) {

   const hanlerCreateUser = (data: any) => {
      const users = recoverUsers()

      const addFieldsToData = {
         ...data,
         id: users.length + 1,
         password: PASSWORD_DEFAULT
      }

      try {
         const dataUser = user.parse(addFieldsToData)

         const findUser = users.find(user => {
            return user.email == data.email && user.password == dataUser.password && user.username == dataUser.username
         })

         if (findUser)
            throw new Error("Esto usuario ya existe")

         createUser(dataUser)

      } catch (error) {
         console.error(error)
      }
   }

   const hanlerCreateUPost = (data: any) => {
      const posts = recoverPost()
      const user = recoverLogin()

      const addFieldsToData = {
         ...data,
         id: posts.length + 1,
         userId: user?.id
      }

      try {
         const datapost = post.parse(addFieldsToData)

         createPost(datapost)

      } catch (error) {
         console.error(error)
      }
   }

   return (
      <div className="container_create">
         <div className="actions_container_create">
            <div>
               <h2>{`Crear un ${create}`}</h2>
            </div>

            <div>
            </div>
         </div>

         <div className="form_create">
            {
               create == 'post' ? (
                  <Form
                     handleSubmit={hanlerCreateUPost}
                     render={({ handleChange }) => {
                        return (

                           <>
                              <Input type="text" field="Titulo" name="title" handleChange={handleChange} />
                              <Input type="text" field="Contraseña" name="body" handleChange={handleChange} />
                              <ButtonPrimary isSubmit title={`Guardar ${create}`} />
                           </>
                        )
                     }}
                  />
               ) : (
                  <Form
                     handleSubmit={hanlerCreateUser}
                     render={({ handleChange }) => {
                        return (
                           <>
                              <Input type="text" field="Nombre" name="name" handleChange={handleChange} />
                              <Input type="text" field="Nombre de Usuario" name="username" handleChange={handleChange} />
                              <Input type="email" field="Correo electronico" name="email" handleChange={handleChange} />
                              <select onChange={(e) => handleChange("role", e.target.value)}>
                                 <option value="admin">Administrador</option>
                                 <option value="user">Usuario</option>
                              </select>
                              <ButtonPrimary isSubmit title={`Guardar ${create}`} />
                           </>
                        )
                     }}
                  />
               )
            }



         </div>
      </div>
   )

}