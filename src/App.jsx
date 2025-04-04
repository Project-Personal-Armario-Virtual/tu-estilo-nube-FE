import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Upload from './pages/Upload';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/" element={<Login />} /> {/* Página por defecto */}
            </Routes>
        </Router>
    );
}

export default App;