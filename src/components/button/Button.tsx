import './buttonStyles.css'

interface ButtonProps {
   isSubmit?: boolean,
   title?: string,
   icon?: string | undefined,
   handlerClick?: () => void
}

export function ButtonPrimary({ title, isSubmit = false, handlerClick }: ButtonProps) {
   return (
      <button onClick={handlerClick} className='buttonPrimary' type={isSubmit ? 'submit' : 'button'}>
         <div>
            <span>{title}</span>
         </div>
      </button>
   )
}

export function ButtonSecondary({ title, icon, isSubmit = false, handlerClick }: ButtonProps) {
   return (
      <button onClick={handlerClick} className='buttonSecondary' type={isSubmit ? 'submit' : 'button'}>
         <div className='container_txt'>
            {icon && <img src={icon} />}
            {title && <span>{title}</span>}
         </div>
      </button>
   )
}
