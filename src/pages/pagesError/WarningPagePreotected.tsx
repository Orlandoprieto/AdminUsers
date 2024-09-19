import './notFoundStyles.css'

// @ts-ignore
import icon from '../../assets/iconCandado.png'

export default function WarningPagePreotected() {
   return (
      <div className="container_error">
         <div className="card_error">
            <div className="container_info_error">
               <img src={icon} alt=""/>
               <h2>!Ups!</h2>
               <p>Debes iniciar sesion para ver todo el contenido.</p>
            </div>
         </div>
      </div>
   )
}