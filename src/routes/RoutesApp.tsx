import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom'
import { Login } from '../pages/loginPage/Login'
import  NotFoundPage  from '../pages/notFoundPage/NotFoundPage'

export default function RoutesApp() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={ <Navigate to="/login" /> } />
            <Route path='/login' element={<Login />}/>
            <Route path='/dashboard'/>
            <Route path='*' element={ <NotFoundPage /> } />
         </Routes>
      </BrowserRouter>
   )
}