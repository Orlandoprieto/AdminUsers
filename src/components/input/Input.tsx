import { useId } from "react"
import './inputStyle.css'

interface InputProps {
   type?: 'text' | 'submit' | 'email' | 'textarea' | 'password'
   name: string
   field?: string
   value?: string
   handleChange: (name: string, value: string) => void
}

export default function Input({ field, type, value, name, handleChange }: InputProps) {
   const id = useId()

   return (
      <div className="container-input">
         <label htmlFor={id}>{ field }</label>

         <input
            value={value}
            className="input"
            onChange={(e) => handleChange(name, e.target.value)}
            id={id}
            name={name}
            type={type}
         />
      </div>
   )
}