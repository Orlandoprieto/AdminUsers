import './containerEditPostStyles.css'
import { ButtonPrimary } from "../button/Button"
import Form from "../form/Form"
import Input from "../input/Input"
import {  createPost, recoverLogin, recoverPost } from '../../config/utils'
import { Post, post } from '../../validations/post'

interface ContainerEditPostProps {
   postToEdit: Post
}

export default function ContanierEditPost({ postToEdit }: ContainerEditPostProps) {

   const hanlerEditPost = (data: any) => {
      const posts = recoverPost()
      const user = recoverLogin()

      const findPost = posts.find(post => post.id == postToEdit.id) 

      try {
         const datapost = post.parse(data)

         const chageValues = {
            ...findPost,
            title: datapost.title,
            body: datapost.body
         }

         //createPost(datapost)

      } catch (error) {
         console.error(error)
      }
   }

   return (
      <div className="container_create">
         <div className="actions_container_create">
            <div>
               <h2>Edita este post</h2>
            </div>

            <div>
            </div>
         </div>

         <div className="form_create">

            <Form
               handleSubmit={hanlerEditPost}
               render={({ handleChange }) => {
                  return (
                     <>
                        <Input value={postToEdit.title} type="text" field="Titulo" name="title" handleChange={handleChange} />
                        <Input value={postToEdit.body} type="text" field="Contraseña" name="body" handleChange={handleChange} />
                        <ButtonPrimary isSubmit title={`Guardar post`} />
                     </>
                  )
               }}
            />
         </div>
      </div>
   )

}