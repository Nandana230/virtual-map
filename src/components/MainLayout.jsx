import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [selectedOption, setSelectedOption] = useState('feedbacks');

  return (
    <div className="flex">
      <Sidebar setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
      <div className="flex-1 p-4">
        <Outlet context={{ selectedOption, setSelectedOption }} />
      </div>
    </div>
  );
};

export default MainLayout;
