import './inputStyle.css'

interface InputProps {
    handleChange: (name: string, value: string) => void
}

export default function Input({ handleChange }: InputProps) {
   

    return (
        <div className="container-input">
            <select>

            </select>
        </div>
    )
}