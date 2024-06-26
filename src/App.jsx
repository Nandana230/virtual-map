import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EditPage from './components/EditPage';
import NewPage from './Pages/Newpage'; // Ensure this file exists
import AboutPage from './Pages/AboutPage';
import GoBackButton from './components/GoBackButton';
import AdminDashboard from './components/AdminDashboard';
import ContactUs from './Pages/ContactUs';
import MainLayout from './components/MainLayout';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={loggedIn ? <Navigate to="/admin" /> : <LoginPage />} />
        <Route path="/admin" element={loggedIn && admin ? <MainLayout /> : <Navigate to="/login" />}>
          <Route path="feedbacks" element={<AdminDashboard />} />
          <Route path="feedback-analytics" element={<AdminDashboard />} />
          <Route path="analytics" element={<AdminDashboard />} />
          <Route index element={<Navigate to="/admin/feedbacks" />} />
        </Route>
        <Route path="/*" element={<GoBackButton />} />
      </Routes>
    </Router>
  );
}

export default App;
