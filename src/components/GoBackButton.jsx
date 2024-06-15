import React from 'react';

const GoBackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button onClick={handleGoBack} className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      Go Back 
    </button>
  );
};

export default GoBackButton;


