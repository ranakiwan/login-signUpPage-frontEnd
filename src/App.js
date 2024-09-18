import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import LoginPage from './Pages/Login'
import SignUpPage from './Pages/Signup';
import HomePage from './Pages/home';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/api/auth/login' element={<LoginPage />} />
                    <Route path='/' element={<Navigate to="/api/auth/login" />} />
                    <Route path='/api/auth/createUser' element={<SignUpPage />} />
                    <Route path='/home' element={<HomePage />} /> {/* Use HomePage instead of homePage */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
