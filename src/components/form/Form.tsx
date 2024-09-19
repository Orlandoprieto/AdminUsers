import { useState } from "react";
import './formStyle.css';

interface FormProps {
   handleSubmit: (data: any) => void
   render: ({
      handleChange,
   }: {
      handleChange: (name: string, value: string) => void;
   }) => React.ReactNode
}

export default function Form({ render, handleSubmit }: FormProps) {
   const [data, setData] = useState({})

   const handleChange = (name: string, value: string) => {
      setData(prev => ({ ...prev, [name]: value }))
   }

   const onSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      handleSubmit(data)
      console.log(data)
   }

   return (
      <form onSubmit={onSubmit}>
         { render({ handleChange }) } 
      </form>
   )
}