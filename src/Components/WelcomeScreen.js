import React from 'react';

function WelcomeScreen({ user, onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 relative">
      <div className="absolute top-4 right-4">
        <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white text-lg">
          {user.name[0].toUpperCase()}
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2">Welcome to MVP Application</h1>
      <p className="mb-6 text-lg">Hello, {user.firstName}!</p>
      <button onClick={onStart} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-purple-700">
        Start
      </button>
    </div>
  );
}

export default WelcomeScreen;