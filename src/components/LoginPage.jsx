import React, { useState } from 'react';
import GoBackButton from './GoBackButton';

const LoginPage = ({ handleLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAuthenticated = await handleLogin(password);
    if (isAuthenticated) {
      // Open the EditPage in a new tab after successful login
      window.open('/edit', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-300 to-rose-400 flex flex-col items-center justify-center">
      <div className="absolute top-4 left-4">
        {/* Absolute positioning for the GoBackButton */}
        <GoBackButton />
      </div>
      <h2 className="text-4xl font-semibold mb-4">Hello Admin!!</h2>
      {/* Hello Admin outside and above the box */}
      <div className="bg-purple-100 p-8 rounded-lg shadow-md mt-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Enter Password</h2>
          {/* Enter Password inside the form */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;