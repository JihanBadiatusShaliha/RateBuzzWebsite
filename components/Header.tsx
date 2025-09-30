import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePanel from './ProfilePanel';
import { NAVIGATION_LINKS } from '../constants';
import { useAuth } from '../context/AuthContext';

// A new, self-contained search bar component as requested.
// It's styled to be white and elongated ("lonjong").
const CenteredSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query.trim()}`);
      setQuery(''); // Clear input after submitting for a clean state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari film..."
        className="w-full bg-slate-800/50 text-white placeholder-slate-400 py-2.5 pl-6 pr-14 rounded-full border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
      />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors p-2 rounded-full" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

const Header: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-slate-900/80 backdrop-blur-sm' : 'bg-transparent'
        } py-3 px-4 sm:px-8 md:px-16`}
      >
        <div className="container mx-auto flex justify-between items-center gap-4">
          {/* Left Side */}
          <div className="flex items-center space-x-8 flex-shrink-0">
            <Link to="/" className="text-2xl sm:text-3xl font-black text-indigo-500 uppercase">RateBuzz</Link>
            <nav className="hidden lg:flex items-center space-x-4">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Middle: Centered Search Bar (Visible on medium screens and up) */}
          <div className="hidden md:flex flex-grow justify-center px-4">
            <CenteredSearchBar />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* The old search icon is removed entirely. The layout now naturally adjusts. */}
            <button onClick={() => setIsPanelOpen(true)} aria-label="Open profile menu">
              <img
                src={currentUser?.profilePictureUrl}
                alt="User Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-md"
              />
            </button>
          </div>
        </div>
      </header>
      <ProfilePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
};

export default Header;