// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen p-3 bg-gray-800 shadow">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <Link to="/user-management" className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700">
                User Management
              </Link>
            </li>
            <li className="rounded-sm">
              <Link to="/feedback-management" className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700">
                Feedback Management
              </Link>
            </li>
            <li className="rounded-sm">
              <Link to="/analytics" className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700">
                Analytics
              </Link>
            </li>
            <li className="rounded-sm">
              <Link to="/settings" className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
