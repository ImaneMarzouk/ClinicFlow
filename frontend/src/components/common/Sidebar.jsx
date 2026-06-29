import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaCalendarCheck, 
  FaUserPlus,
  FaPlusCircle,
  FaStethoscope
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { isAdmin } = useAuth();

  const links = [
    { to: '/dashboard', icon: FaHome, label: 'Tableau de Bord' },
    { to: '/patients', icon: FaUsers, label: 'Patients' },
    { to: '/appointments', icon: FaCalendarCheck, label: 'Rendez-vous' },
  ];

  const adminLinks = [
    { to: '/patients/new', icon: FaUserPlus, label: 'Nouveau Patient' },
    { to: '/appointments/new', icon: FaPlusCircle, label: 'Nouveau Rendez-vous' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaStethoscope className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">ClinicFlow</h1>
            <p className="text-xs text-gray-500">Gestion Médicale</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
            Navigation
          </p>
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon className="icon" />
              {label}
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <div className="border-t border-gray-200 my-4"></div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
                Administration
              </p>
              {adminLinks.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon className="icon" />
                  {label}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-xs text-indigo-600 font-medium">
              {isAdmin ? '👑 Administrateur' : '👤 Personnel'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {isAdmin ? 'Accès complet' : 'Accès limité'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;