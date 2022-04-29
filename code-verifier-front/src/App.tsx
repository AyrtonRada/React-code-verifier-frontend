import React from 'react';
import './App.css';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import { BrowserRouter as Router, Route, Navigate, Link, Routes } from 'react-router-dom'  
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { KatasPages } from './pages/KatasPages';
import { KatasDetailPage } from './pages/KatasDetailPage';

function App() {
  return (
    <div className="App">
      <LoginForm />
      <RegisterForm />
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/katas'>Katas</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/*Definir Rutas*/}
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<LoginForm/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/katas' element={<KatasPages/>}></Route>
          <Route path='/katas/:id' element={<KatasDetailPage/>}></Route>
          
          {/*Redireccionar cuando no encuentra una pagina*/}
          <Route path='*' element={<Navigate to='/' replace />}></Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
