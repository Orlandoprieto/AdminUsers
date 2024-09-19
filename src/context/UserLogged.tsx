import { createContext, ReactElement, useState } from 'react'
import { user } from '../validations/user'
import z from 'zod'

interface UserLoggedProps {
    children: ReactElement
}

type User = z.infer<typeof user>

export const userLoggedContext = createContext({
    user: null as User | null,
    initSession: (user: User) => { },
    closeSession: () => { }
})

export default function UserLogged({ children }: UserLoggedProps) {
    const [user, setUser] = useState<User | null>(null)

    const closeSession = () => {
        setUser(null)
    }

    const initSession = (user: User) => {
        setUser(user)
        console.log(user)
    }

    return (
        <userLoggedContext.Provider value={{ closeSession, initSession, user }}>
            {children}
        </userLoggedContext.Provider>
    )
}