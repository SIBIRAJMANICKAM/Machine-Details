// App.js

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import { useState } from 'react';
import { Header } from './components/Header';
import { AdminDashboard } from './components/AdminDashboard.js';
import { AddDetails } from './components/AddDetails.js';
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import { EditDetails } from './components/EditDetails.js';
import { MachineDetails } from './components/MachineDetails.js';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true
    navigate('/'); // Redirect to homepage after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Homepage route, show AdminDashboard if logged in, otherwise show Login */}
        <Route exact path="/" element={isLoggedIn ? <AdminDashboard /> : <Login onLogin={handleLogin} />} />
        
        {/* Other protected routes */}
        <Route exact path="/login" element={<Login onLogin={handleLogin} />} />
        <Route exact path="/add-details" element={isLoggedIn ? <AddDetails /> : <NavLink to="/login" />} />
        <Route exact path="/edit/:id" element={isLoggedIn ? <EditDetails /> : <NavLink to="/login" />} />
        <Route exact path="/view/:id" element={isLoggedIn ? <MachineDetails /> : <NavLink to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
