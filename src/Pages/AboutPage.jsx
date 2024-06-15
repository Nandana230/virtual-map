
import React from 'react';

const About = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white w-full max-w-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p>
        This  website is to access  the virtual map of our college,CUCEK,which enables real-time navigation of the college campus. Whether you're a prospective student, faculty member, or simply curious about our institution, this panoramic map offers a dynamic way to experience our campus from anywhere in the world.
        </p>
        <button onClick={onClose} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          Close
        </button>
      </div>
    </div>
  );
}

export default About;
