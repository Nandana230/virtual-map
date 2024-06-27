// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackCollection = collection(db, 'feedback');
        const feedbackSnapshot = await getDocs(feedbackCollection);
        const feedbackList = feedbackSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeedbacks(feedbackList);
      } catch (error) {
        console.error('Error fetching feedbacks: ', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
      <h2>Feedbacks</h2>
      <ul>
        {feedbacks.map((feedback, index) => (
          <li key={feedback.id}>
            <p><strong>Message:</strong> {feedback.message}</p>
            <p><strong>Feedback:</strong> {feedback.feedback}</p>
            <p><strong>Timestamp:</strong> {new Date(feedback.timestamp.seconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <h2>Analytics</h2>
      {/* Add your analytics components or summary here */}
    </div>
  );
};

export default AdminDashboard;                