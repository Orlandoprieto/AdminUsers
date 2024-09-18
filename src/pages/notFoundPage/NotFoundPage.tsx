import './notFoundStyles.css'

// @ts-ignore
import icon from '../../assets/iconNotFound.png'

export default function NotFoundPage() {
   return (
      <div className="container_notFound">
         <div className="card_notFound">
            <div className="container_info_notFound">
               <img src={icon} alt=""/>
               <h2>!Ups!</h2>
               <p>No hemos encontrado lo que estas buscando</p>
            </div>
         </div>
      </div>
   )
}