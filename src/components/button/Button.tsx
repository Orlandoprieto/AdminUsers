import './buttonStyles.css'

interface ButtonProps {
   isSubmit?: boolean,
   title?: string,
   icon?: string | undefined,
}

export function ButtonPrimary({ title, isSubmit = false }: ButtonProps) {
   return (
      <button className='buttonPrimary' type={isSubmit ? 'submit' : 'button'}>
         <div>
            <span>{title}</span>
         </div>
      </button>
   )
}

export function ButtonSecondary({ title, icon, isSubmit = false }: ButtonProps) {
   return (
      <button className='buttonSecondary' type={isSubmit ? 'submit' : 'button'}>
         <div className='container_txt'>
            {icon && <img src={icon} />}
            {title && <span>{title}</span>}
         </div>
      </button>
   )
}
