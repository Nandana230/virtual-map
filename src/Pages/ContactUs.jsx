// src/Pages/ContactUs.jsx
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'feedback'), {
        name,
        email,
        message,
        timestamp: new Date(),
      });
      setName('');
      setEmail('');
      setMessage('');
      alert('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback: ', error);
      alert('Error submitting feedback: ' + error.message);
    }
  };

  return (
    <div
      className="relative isolate overflow-hidden py-24 sm:py-32"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white opacity-80"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Contact Us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-800">
            Want to be a part of this amazing journey? Help us uncover the secret hangouts, hidden nooks, and quirky spots of our college that we might have missed! Share your innovative ideas, pictures of the areas to be included or stories with us at{' '}
            <a href="mailto:virtualmapcucek@gmail.com"><b>virtualmapcucek@gmail.com</b></a>
          </p>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 mt-20">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">We Value Your Feedback</h2>
          <p className="mt-6 text-lg leading-8 text-gray-800">
            Your feedback helps us improve and create better experiences for everyone. Please share your thoughts with us!
          </p>
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-gray-900 sm:grid-cols-2 md:flex lg:gap-x-10">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full p-4 text-black border border-gray-300 rounded"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full p-4 text-black border border-gray-300 rounded"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              required
              className="w-full p-4 text-black border border-gray-300 rounded"
            />
            <button type="submit" className="mt-4 w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
