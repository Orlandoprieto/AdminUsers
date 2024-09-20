import './ContainerCreateStyles.css'
import { ButtonPrimary } from "../button/Button"
import Form from "../form/Form"
import Input from "../input/Input"
import { createUser, createPost, recoverUsers, recoverLogin, recoverPost } from '../../config/utils'
import { user } from '../../validations/user'
import { post } from '../../validations/post'
import { PASSWORD_DEFAULT } from '../../config/const'
import { useState } from 'react'
import { ZodError } from 'zod'


interface ContainerListPostProps {
   create: "post" | "user"
}

export default function ContanierCreate({ create }: ContainerListPostProps) {
   const [messageError, serMessageError] = useState<string>('')
   const [messageCompleted, serMessageCompleted] = useState<string>('')

   const hanlerCreateUser = (data: any) => {
      serMessageCompleted("")
      serMessageError("")

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

         serMessageCompleted("Usuario creado con exito")

      } catch (err) {
         if(err instanceof ZodError) {
            const errorZod = err as ZodError
            console.log(errorZod)

            serMessageError(errorZod.errors[0].message)
            return
         }

         const error = err as Error
         serMessageError(error.message)
      }
   }

   const hanlerCreateUPost = (data: any) => {
      serMessageCompleted("")
      serMessageError("")

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

         serMessageCompleted("Post creado con exito")

      } catch (err) {
         if(err instanceof ZodError) {
            const errorZod = err as ZodError
            console.log(errorZod)

            serMessageError(errorZod.errors[0].message)
            return
         }

         const error = err as Error
         serMessageError(error.message)
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
                              <Input type="text" field="Contenido" name="body" handleChange={handleChange} />
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
                              <select defaultValue='user' onChange={(e) => handleChange("role", e.target.value)}>
                                 <option  value="admin">Administrador</option>
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

         {
            messageError.length > 0
            && <span className='error_msg'>{messageError}</span>
         }

         {
            messageCompleted.length > 0
            && <span className='complete_msg'>{messageCompleted}</span>
         }
      </div>
   )

}