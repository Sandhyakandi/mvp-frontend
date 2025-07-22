import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';

const TopNavbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/"; // Optional: Redirect to login
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const userInitial = user?.name?.[0]?.toUpperCase() || "?";

  return (
    <nav className="bg-white shadow px-4 md:px-8 py-4 flex items-center justify-between w-full z-10">
      {/* Left: Logo and App Name */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-semibold text-blue-600">MVP Application</span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-6 flex-wrap ml-auto relative">
        <Dropdown label="Project Controls" items={['New Project', 'Open', 'Save', 'Export']} />
        <Dropdown label="Account Info" items={['User Profile', 'Subscription Status']} />
        <Dropdown label="Settings" items={['Application Configurations', 'Preferences']} />
        <Dropdown label="Help" items={['Documentation', 'Tutorials', 'Support access']} />

        {/* Profile Icon with Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg focus:outline-none"
          >
            {userInitial}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <ul className="py-1 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
