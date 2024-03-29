// React Router DOM Imports
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { KatasDetailPage } from '../pages/KatasDetailPage';
import { KatasPages } from '../pages/KatasPages';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';


export const AppRoutes = () => {
    return (
        <Routes>
          {/* Routes definition */}
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/katas' element={<KatasPages />}></Route>
          <Route path='/katas/:id' element={<KatasDetailPage />}></Route>
          {/* Redirecto when Page Not Found */}
          <Route 
            path='*' 
            element={<Navigate to='/' replace />}>
          </Route>
        </Routes>
    )
}
