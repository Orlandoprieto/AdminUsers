import { useContext, useState } from 'react';
import { userLoggedContext } from '../../context/UserLogged';
import Form from "../../components/form/Form"
import Input from "../../components/input/Input";
import './loginPageStyles.css';
import {ButtonPrimary} from "../../components/button/Button";
import z, { ZodError } from 'zod';
import { loginUser, user } from '../../validations/user';
import { useNavigate } from 'react-router-dom';
import { FIELD_USERS_IN_STORAGE, FIELD_USER_SESION } from '../../config/const';

// @ts-ignore
import icon from '../../assets/iconUsers.png'

export default function Login() {
   const navigate = useNavigate()

   const [messageError, serMessageError] = useState<string>('')

   type User = z.infer<typeof user>

   const handlerLogin = (data: any) => {
      const usersJson = localStorage.getItem(FIELD_USERS_IN_STORAGE)
      let users: User[] = []

      try {
         if (usersJson) {
            users = JSON.parse(usersJson)
         }

         const credentialUser = loginUser.parse(data)

         const findUser = users.find(user => {
            return user.email == credentialUser.email && user.password == credentialUser.password
         })

         if (!findUser)
            throw new Error("No se encontro este usuario.")

         localStorage.setItem(FIELD_USER_SESION, JSON.stringify(findUser))


         navigate('/dashboard')

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
      <div className="container">
         <div className="card_login">
            <div className="container_info">
               <img src={icon} alt="" />

               <h2>Bienvenido</h2>
               <span>Inicia sesión con tu cuenta para acceder a la plataforma.</span>
            </div>

            <Form
               handleSubmit={handlerLogin}
               render={({ handleChange }) => {
                  return (
                     <>
                        <Input type="email" field="Correo electronico" name="email" handleChange={handleChange} />
                        <Input type="password" field="Contraseña" name="password" handleChange={handleChange} />
                        <ButtonPrimary isSubmit title="Iniciar sesion" />
                     </>
                  )
               }}
            />

            { 
               messageError.length > 0 
                  && <span className='error_msg'>{messageError}</span>
            }
         </div>
      </div>
   )
}