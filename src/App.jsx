import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EditPage from './components/EditPage';
import Newpage from './Pages/Newpage';
import AboutPage from './Pages/AboutPage';
import GoBackButton from './components/GoBackButton'; 

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState('Initial data from MongoDB');

  const handleLogin = (password) => {
    if (password === 'password123') {
      setLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleUpdate = (newData) => {
    setData(newData);
    alert('Data updated successfully');
  };

  return (
    <Router>
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/" element={<Newpage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Route for login page */}
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/edit" /> : <LoginPage handleLogin={handleLogin} />}
        />
        
        {/* Route for edit page */}
        <Route
          path="/edit"
          element={loggedIn ? <EditPage data={data} handleUpdate={handleUpdate} /> : <Navigate to="/login" />}
        />
        
        {/* Catch-all route for invalid URLs */}
        <Route path="/*" element={<GoBackButton />} />
      </Routes>
    </Router>
  );
}

export default App;
