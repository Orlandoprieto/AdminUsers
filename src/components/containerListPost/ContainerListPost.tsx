import { useEffect, useState } from "react"
import { user, User } from "../../validations/user"
import { recoverUsers } from "../../config/utils"

export default function ContanierListPosts() {
    const [users, setUsers] = useState<User[]>([])
    const [id, setId] = useState<number | String>('todos')
    const [filterUsers, setFilterUsers] = useState<User[]>([])

    useEffect(() => {
        const users = recoverUsers()
        setUsers(users)
    })

    useEffect(() => {
        if (id == "todos") {
            setFilterUsers(users)
            return
        }

        const filter = users.filter(user => user.id == id)

        setFilterUsers(filter)
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setId(parseInt(e.target.value));
    };

    return (
        <div className="cardContainerUser">
            <div className="actions">
                <select onChange={handleChange}>
                    <option value="todos">Todos</option>
                    {users.map(user => (
                        <option value="admin">{user.name}</option>
                    ))}
                </select>
            </div>

            <div className="">
                {filterUsers.map(user => (
                    <p>{user.name}</p>
                ))}
            </div>
        </div>
    )
}