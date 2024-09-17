import { useState } from "react";
import './formStyle.css'

interface FormProps {
   render: ({
      data,
      handleChange,
   }: {
      data: Record<string, string>;
      handleChange: (name: string, value: string) => void;

   }) => React.ReactNode
}

export default function Form({ render }: FormProps) {
   const [data, setData] = useState({})

   const handleChange = (name: string, value: string) => {
      setData(prev => ({ ...prev, [name]: value }))
      console.log(data)
   }

   return (
      <form>
         { render({ handleChange, data }) }
      </form>
   )
}