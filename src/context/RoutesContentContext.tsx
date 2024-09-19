import { createContext, ReactElement, useState } from 'react'

interface UserLoggedProps {
    children: ReactElement
}

export const routesContentContext = createContext({
    content: 'posts',
    chageContent: (content: string) => { console.log(content) }
})

export default function RoutesContentContext({ children }: UserLoggedProps) {
    const [content, setContent] = useState<string>('posts')

    const chageContent = (content: string) => { 
        setContent(content)
        console.log(content)
    }

    
    return (
        <routesContentContext.Provider value={{ content, chageContent }}>
            {children}
        </routesContentContext.Provider>
    )
}