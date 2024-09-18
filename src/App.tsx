
import { useEffect } from "react"
import { configInit } from './config/config'
import RoutesApp from "./routes/RoutesApp"

function App() {

  useEffect(() => {
    configInit()
  })

  return (
    <RoutesApp/>
  )
}

export default App
