import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EditPage from './components/EditPage';
import Newpage from './Pages/Newpage';
import AboutPage from './Pages/AboutPage';
import GoBackButton from './components/GoBackButton';
import AdminDashboard from './components/AdminDashboard';
import ContactUs from './Pages/ContactUs';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState('Initial data from MongoDB');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user is an admin
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (adminDoc.exists() && adminDoc.data().role === 'admin') {
          setAdmin(true);
          setLoggedIn(true);
        } else {
          setAdmin(false);
          setLoggedIn(false);
          alert("Access denied: You are not an admin.");
        }
      } else {
        setAdmin(false);
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = (newData) => {
    setData(newData);
    alert('Data updated successfully');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Newpage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/admin" /> : <LoginPage />}
        />

        <Route
          path="/edit"
          element={loggedIn && admin ? <EditPage data={data} handleUpdate={handleUpdate} /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={loggedIn && admin ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route path="/*" element={<GoBackButton />} />
      </Routes>
    </Router>
  );
}

export default App;
