import React from 'react';
import './App.css';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import { BrowserRouter as Router, Route, Navigate, Link, Routes } from 'react-router-dom'  

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
          <Route path='/'></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
