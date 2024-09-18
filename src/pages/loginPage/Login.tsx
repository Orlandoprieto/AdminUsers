import Form from "../../components/form/Form"
import Input from "../../components/input/Input"
import './loginPageStyles.css'
import Button from "../../components/button/Button"

// @ts-ignore
import icon from '../../assets/iconUsers.png'

export function Login() {

   const createUser = (data: any) => {
      console.log(data)
      console.log("hola")
   }

   return (
      <div className="container">
         <div className="card">
            <div className="container_info">
               <img src={icon} alt=""/>

               <h2>Bienvenido</h2>
               <span>Inicia sesión con tu cuenta para acceder a la plataforma.</span>
            </div>

            <Form
               handleSubmit={createUser}
               render={({ handleChange }) => {
                  return (
                     <>
                        <Input type="email" field="Correo electronico" name="email" handleChange={handleChange} />
                        <Input type="password" field="Contraseña" name="password" handleChange={handleChange} />
                        <Button isSubmit title="Iniciar sesion"/>
                     </>
                  )
               }}
            />
         </div>
      </div>
   )
}