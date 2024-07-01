// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <div className="flex justify-end p-4 bg-white dark:bg-gray-800">
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default Header;
