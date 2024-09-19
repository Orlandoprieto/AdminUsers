import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import Login from '../pages/loginPage/Login';
import NotFoundPage from '../pages/pagesError/NotFoundPage';
import WarningPagePreotected from '../pages/pagesError/WarningPagePreotected';
import DashboardAdmin from '../pages/dashboard/Dashboard';

export default function RoutesApp() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={< DashboardAdmin />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/error" element={<WarningPagePreotected />} />
         </Routes>
      </BrowserRouter>
   );
}
