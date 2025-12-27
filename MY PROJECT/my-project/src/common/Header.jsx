import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();

  const activeClass = "text-blue-600 font-bold";
  const normalClass = "text-gray-700 hover:text-blue-600 font-medium";

  const isLoggedIn = Cookies.get("user_login");

  const handleLogout = () => {
    Cookies.remove("user_login");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <img
                className="h-10 w-auto"
                src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Vedix Logo"
              />
              <span className="text-2xl font-bold text-gray-900">Vedix</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>
              Home
            </NavLink>

            <div className="relative group">
              <button className={normalClass + " flex items-center"}>
                Company
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-20">
                <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : normalClass) + " block px-4 py-2 hover:bg-gray-100"}>
                  About Us
                </NavLink>
                <NavLink to="/resources" className={({ isActive }) => (isActive ? activeClass : normalClass) + " block px-4 py-2 hover:bg-gray-100"}>
                  Resources
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? activeClass : normalClass) + " block px-4 py-2 hover:bg-gray-100"}>
                  Contact
                </NavLink>
              </div>
            </div>

            <NavLink to="/team" className={({ isActive }) => isActive ? activeClass : normalClass}>
              Team
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>
              Contact
            </NavLink>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex md:items-center space-x-2">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 ml-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : normalClass) + " block px-3 py-2"}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : normalClass) + " block px-3 py-2"}>About</NavLink>
          <NavLink to="/team" className={({ isActive }) => (isActive ? activeClass : normalClass) + " block px-3 py-2"}>Team</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? activeClass : normalClass) + " block px-3 py-2"}>Contact</NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="block px-3 py-2 text-blue-600 border border-blue-600 rounded">
                Login
              </NavLink>
              <NavLink to="/signup" className="block px-3 py-2 text-white bg-blue-600 rounded">
                Sign Up
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 text-white bg-red-500 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
