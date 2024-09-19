import { useEffect } from "react"
import { configInit } from './config/config'
import RoutesApp from "./routes/RoutesApp"
import UserLogged from "./context/UserLogged"

function App() {

  useEffect(() => {
    configInit()
  })

  return (
    <UserLogged>
      <RoutesApp />
    </UserLogged>
  )
}

export default App
