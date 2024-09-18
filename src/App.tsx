import { Login } from "./pages/loginPage/Login"
import { useEffect } from "react"
import { configInit } from './config/config'

function App() {

  useEffect(() => {
    configInit()
  })

  return (
    <Login/>
  )
}

export default App
