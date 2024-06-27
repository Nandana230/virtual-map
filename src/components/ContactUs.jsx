import React, { useState } from 'react';
import { db } from '../firebase';
import firebase from 'firebase/app'; 
const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('feedback').add({
        name,
        email,
        message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      alert('Feedback submitted!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <p>If you want to share any pictures or ideas to be added to this project and be a part of it, then contact us at <a href="mailto:your-email@example.com">your-email@example.com</a>.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
