import { useId, useState } from "react"
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

   const [valueInput, setValueInput] = useState<string>(value ?? '')

   const updatetextInput = (e : any) => {
      setValueInput(e.target.value)
      handleChange(name, e.target.value)
   }

   return (
      <div className="container-input">
         <label htmlFor={id}>{ field }</label>

         <input
            value={valueInput}
            className="input"
            onChange={updatetextInput}
            id={id}
            name={name}
            type={type}
         />
      </div>
   )
}