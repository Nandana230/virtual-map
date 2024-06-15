import React, { useState } from 'react';
import GoBackButton from './GoBackButton';

const EditPage = ({ data, handleUpdate }) => {
  const [newData, setNewData] = useState(data);

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(newData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-rose-200 flex flex-col items-center justify-center">
      <div className="absolute top-8 left-8"> {/* Absolute positioning for the GoBackButton */}
        <GoBackButton />
      </div>
      <h1 className="mt-16">Edit/Update Page</h1> {/* Adding margin top to create space */}
      <form onSubmit={handleSubmit} className="bg-purple-100 p-8 rounded-lg shadow-md mt-8">
        <input
          type="text"
          placeholder="Edit data"
          name="data"
          value={newData}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        <button type="submit" className="w-full bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPage;

