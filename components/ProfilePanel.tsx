import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();

  const panelLinks = [
    { name: 'Info Akun', to: '/account' },
    { name: 'Daftar Tonton Nanti', to: '/watchlist' },
    { name: 'Cari Pengguna', to: '/search-users' },
    { name: 'Daftar Teman', to: '/friends' },
    { name: 'Pengaturan', to: '/settings' },
  ];

  const handleLogout = () => {
    onClose();
    logout();
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      
      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-slate-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <img src={currentUser?.profilePictureUrl} alt="User Profile" className="w-12 h-12 rounded-md" />
                <span className="font-bold text-lg">{currentUser?.username}</span>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl" aria-label="Close profile menu">&times;</button>
            </div>
            <nav>
              <ul>
                {panelLinks.map((link) => (
                  <li key={link.name} className="mb-4">
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="block py-2 text-slate-300 hover:text-white text-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-auto">
             <button
                onClick={handleLogout}
                className="w-full text-center py-2 text-slate-400 hover:text-white text-lg transition-colors bg-slate-700 hover:bg-indigo-700 rounded-md"
              >
                Logout
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePanel;