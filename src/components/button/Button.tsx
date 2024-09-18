import './buttonStyles.css'

interface ButtonProps {
   isSubmit: boolean,
   title: string,
   icon?: string | undefined,
}

export default function Button({ title, icon, isSubmit }: ButtonProps) {
   return (
      <button type={isSubmit ? 'submit' : 'button'}>
         <div>
            {icon && <img src={icon} />}
            <span>{title}</span>
         </div>
      </button>
   )
}