import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ setSelectedOption }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, option) => {
    navigate(path);
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col h-screen p-3 bg-gray-800 shadow">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <button
                className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700"
                onClick={() => handleNavigation('/admin', 'feedbacks')}
              >
                Feedback Management
              </button>
              <ul className="ml-6 mt-2">
                <li className="rounded-sm">
                  <button
                    className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700"
                    onClick={() => handleNavigation('/admin/feedbacks', 'feedbacks')}
                  >
                    Feedbacks
                  </button>
                </li>
                <li className="rounded-sm">
                  <button
                    className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700"
                    onClick={() => handleNavigation('/admin/feedback-analytics', 'feedback-analytics')}
                  >
                    Feedback Analytics
                  </button>
                </li>
              </ul>
            </li>
            <li className="rounded-sm">
              <button
                className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700"
                onClick={() => handleNavigation('/analytics', 'analytics')}
              >
                Analytics
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;