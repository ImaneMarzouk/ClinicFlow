import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaHospital } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaHospital className="text-white text-xl" />
          </div>
          <div>
            <span 
              className="text-lg font-bold text-gray-800 cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              ClinicFlow
            </span>
            <span className="text-xs text-gray-400 ml-2">| Gestion Médicale</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg px-4 py-2 transition"
            >
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-indigo-600 text-xl" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700">
                  {user?.fullName || 'Utilisateur'}
                </p>
                <p className="text-xs text-gray-400 capitalize">{user?.role || 'staff'}</p>
              </div>
              <FaChevronDown className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.fullName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                >
                  <FaSignOutAlt />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;